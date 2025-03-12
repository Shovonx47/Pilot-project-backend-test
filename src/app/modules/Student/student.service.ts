import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TMigrationClass, TStudent } from './student.interface';
import { Student } from './student.model';
import { Auth } from '../Auth/auth.model';
import mongoose, { Types } from 'mongoose';
import { generateStudentId } from './student.utils';
import bcrypt from 'bcrypt';
import config from '../../config';
import { studentSearchableFields } from './student.const';



const createStudentIntoDB = async (payload: TStudent) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check for existing student with the same roll, class, and section
    const existingStudent = await Student.findOne(
      {
        $and: [
          { class: payload.class },
          { section: payload.section },
          { userId: payload.userId }
        ],
        $or: [
          { email: payload.email } // This checks email independently
        ]
      },
      null,
      { session }
    );


    if (existingStudent) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `A student with the same userId-${payload.userId} class, and section already exists.`,
      );
    }


    // Check if the user is registered in Auth
    const checkUserAuth = await Auth.findOne({ userId: payload.userId }).session(session);


    if (!checkUserAuth) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not registered.');
    }

    // Generate a student ID
    const studentId = await generateStudentId(payload.admissionDate);

    // 🔹 Prepare update data for Auth
    const updateAuthData: Record<string, any> = {
      isCompleted: true,
      role: "student",
      userId: ''
    };

    if (!checkUserAuth.password) {
      updateAuthData.password = await bcrypt.hash(
        studentId,
        Number(config.bcrypt_salt_rounds)
      );
    }

    // 🔹 Update Auth record once
    await Auth.findOneAndUpdate(
      { userId: payload.userId },
      { $set: updateAuthData },
      { session, new: true }
    );

    // Create the student record, including the generated studentId
    const studentData = { ...payload, studentId, auth: checkUserAuth._id };
    const student = await Student.create([studentData], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return student[0]; // Return the first element as `create` with an array returns an array
  } catch (error) {
    // Roll back the transaction if an error occurs
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .sort()
    .paginate()
    .search(studentSearchableFields)
    .filter();

  const meta = await studentQuery.countTotal();
  const data = await studentQuery.modelQuery;

  return {
    meta,
    data,
  };
};

// const getSingleStudentDetails = async (id: string) => {
//   const singleStudent = await Student.findById(id);

//   if (!singleStudent) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'No student found');
//   }

//   return singleStudent;
// };

const getSingleStudentDetails = async (identifier: string) => {
  // Check if the identifier is a valid ObjectId, and search by _id
  let query = {};
  if (Types.ObjectId.isValid(identifier)) {
    query = { _id: identifier };
  } else {
    query = { email: identifier };  // If it's not a valid ObjectId, search by email
  }

  // Find student by either _id or email
  const singleStudent = await Student.findOne(query);

  console.log(identifier);
  console.log(singleStudent);

  if (!singleStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No student found');
  }

  return singleStudent;
};



const updateStudentInDB = async (id: string, payload: TStudent) => {

  const existingStudent = await Student.findOne(
    {
      $and: [{ class: payload.class }, { section: payload.section }, { userId: payload.userId }], $or: [
        { email: payload.email } // This checks email independently
      ],
      _id: { $ne: id }
    },
    null,
  );

  if (existingStudent) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `A student with the same userId-${payload.userId}, class, and section already exists.`,
    );
  }

  const sanitizeData = sanitizePayload(payload);

  const updatedStudent = await Student.findByIdAndUpdate(id, sanitizeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found.');
  }

  return updatedStudent;
};

const migrateClassIntoDB = async (id: string, payload: TMigrationClass) => {
  const existingStudent = await Student.findOne({
    $and: [
      { class: payload.previousClass },
      { roll: payload.previousClassRoll },
    ],
    _id: { $eq: id },
  });

  if (!existingStudent) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `No students were found in class ${payload.previousClass}.`,
    );
  }

  const sanitizeData = sanitizePayload(payload);

  const migrateStudent = await Student.findByIdAndUpdate(id, sanitizeData, {
    new: true,
    runValidators: true,
  });

  if (!migrateStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found.');
  }

  return migrateStudent;
};

const deleteStudentFromDB = async (id: string) => {
  // Find the student by ID
  const student = await Student.findById(id);

  // Check if student exists
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found.');
  }

  // Mark the student as deleted
  student.isDeleted = true;

  // Save changes to the database
  await student.save();

  // Return the updated student document
  return student;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentDetails,
  updateStudentInDB,
  migrateClassIntoDB,
  deleteStudentFromDB,
};
