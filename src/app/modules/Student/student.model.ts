import mongoose, { Model, Schema } from 'mongoose';
import { TStudent, TSibling } from './student.interface';

const SiblingSchema: Schema<TSibling> = new Schema(
  {
    siblingName: { type: String, required: false },
    class: { type: String, required: false },
    section: { type: String, required: false },
    gender: { type: String, required: false },
    roll: { type: String, required: false },
    motherTongue: {
      type: String,
      required: false,
    },
  },
  { _id: false },
);

const StudentSchema: Schema<TStudent> = new Schema(
  {
    auth: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
    attendance: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
      },
    ],
    userId: { type: String, required: [true, 'User ID is required'] },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true,
    },
    profileImage: {
      type: String,
      required: [true, 'Profile image is required'],
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required'],
    },
    admissionDate: {
      type: String,
      required: [true, 'Admission date is required'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Active', 'Inactive'],
    },
    category: { type: String, required: [true, 'Category is required'] },
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    previousClass: [{ type: String, required: false }],
    previousClassRoll: [{ type: String, required: false }],
    roll: { type: String, required: [true, 'Roll is required'] },
    class: { type: String, required: [true, 'Class is required'] },
    section: { type: String, required: [true, 'Section is required'] },
    gender: { type: String, required: [true, 'Gender is required'] },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    bloodGroup: { type: String, required: [true, 'Blood group is required'] },
    religion: { type: String, required: [true, 'Religion is required'] },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    email: { type: String, required: [true, 'Email is required'] },
    board: { type: String, required: [true, 'Board is required'] },
    motherTongue: {
      type: String,
      required: [true, 'Mother tongue is required'],
    },

    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    previousSchoolName: {
      type: String,
      required: false,
    },
    previousClassName: {
      type: String,
      required: false,
    },
    previousSchoolAddress: {
      type: String,
      required: false,
    },
    previousClassGpa: {
      type: String,
      required: false,
    },
    siblings: [SiblingSchema],

    // Guardian Details
    fatherName: { type: String, required: [true, "Father's name is required"] },
    fatherEmail: {
      type: String,
      required: [true, "Father's email is required"],
    },
    fatherContactNumber: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
    },
    fatherNidNumber: {
      type: String,
      required: [true, "Father's NID number is required"],
    },

    motherName: { type: String, required: [true, "Mother's name is required"] },
    motherEmail: {
      type: String,
      required: [true, "Mother's email is required"],
    },
    motherContactNumber: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
    motherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
    },
    motherNidNumber: {
      type: String,
      required: [true, "Mother's NID number is required"],
    },

    localGuardianName: {
      type: String,
      required: [false, 'Local guardian name is required'],
    },
    relationshipWithLocalGuardian: {
      type: String,
      required: [false, 'Relationship with local guardian is required'],
    },
    localGuardianEmail: {
      type: String,
      required: [false, 'Local guardian email is required'],
    },
    localGuardianContactNumber: {
      type: String,
      required: [false, 'Local guardian contact number is required'],
    },
    localGuardianOccupation: {
      type: String,
      required: [false, 'Local guardian occupation is required'],
    },
    localGuardianNidNumber: {
      type: String,
      required: [false, 'Local guardian NID number is required'],
    },

    // Transport Information
    route: { type: String, required: false },
    vehicleNumber: { type: String, required: false },
    pickupPoint: { type: String, required: false },

    // Hostel Information
    hostelName: { type: String, required: false },
    roomNumber: { type: String, required: false },

    // Documents
    transferCertificate: { type: String, required: false },
    birthCertificate: {
      type: String,
      required: [true, 'Birth certificate is required'],
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

StudentSchema.pre('find', function (next) {
  this.where({ isDeleted: false }); // Check isDeleted
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.where({ isDeleted: false, status: 'Active' }); // Check both isDeleted and status
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: false, status: 'Active' } }); // Check both isDeleted and status
  next();
});

export const Student: Model<TStudent> = mongoose.model<TStudent>(
  'Student',
  StudentSchema,
);
