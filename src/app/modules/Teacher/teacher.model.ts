import mongoose, { Model, Schema } from 'mongoose';
import { TTeacher } from './teacher.interface';

const TeacherSchema = new Schema<TTeacher>(
  {
    auth: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      required: [true, 'Auth reference is required.'],
    },
    attendance: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
      },
    ],
    userId: { type: String, required: [true, 'User ID is required.'] },
    teacherId: { type: String, required: [true, 'Teacher ID is required.'] },
    profileImage: {
      type: String,
      required: [true, 'Profile image is required.'],
    },
    firstName: { type: String, required: [true, 'First name is required.'] },
    lastName: { type: String, required: [true, 'Last name is required.'] },
    category: { type: String, required: [true, 'Category is required.'] },
    joiningDate: {
      type: String,
      required: [true, 'Joining date is required.'],
    },
    subject: { type: String, required: [true, 'Subject is required.'] },
    gender: { type: String, required: [true, 'Gender is required.'] },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required.'],
    },
    bloodGroup: { type: String, required: [true, 'Blood group is required.'] },
    maritalStatus: {
      type: String,
      required: [true, 'Marital status is required.'],
    },
    religion: { type: String, required: [true, 'Religion is required.'] },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    alternativeContactNumber: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    nidNumber: { type: String, required: [true, 'NID number is required.'] },
    educationalQualification: {
      type: String,
      required: [true, 'Educational qualification is required.'],
    },
    motherTongue: {
      type: String,
      required: [true, 'Mother tongue is required.'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Active', 'Inactive'],
    },

    // Payroll info
    EPFNo: { type: String },
    basicSalary: {
      type: String,
      required: [true, 'Basic salary is required.'],
    },
    workLocation: {
      type: String,
      required: [true, 'Work location is required.'],
    },
    contractType: {
      type: String,
      required: [true, 'Contract type is required.'],
    },
    workShift: { type: String, required: [true, 'Work shift is required.'] },

    // Parents info
    fatherName: { type: String, required: [true, 'Father name is required.'] },
    fatherEmail: { type: String },
    fatherContactNumber: {
      type: String,
      required: [true, 'Father contact number is required.'],
    },
    fatherOccupation: {
      type: String,
      required: [true, 'Father occupation is required.'],
    },
    fatherNidNumber: {
      type: String,
      required: [true, 'Father NID number is required.'],
    },

    motherName: { type: String, required: [true, 'Mother name is required.'] },
    motherEmail: { type: String },
    motherContactNumber: {
      type: String,
      required: [true, 'Mother contact number is required.'],
    },
    motherOccupation: {
      type: String,
      required: [true, 'Mother occupation is required.'],
    },
    motherNidNumber: {
      type: String,
      required: [true, 'Mother NID number is required.'],
    },

    // Address
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },

    // Bank account details
    accountName: {
      type: String,
      required: [true, 'Account name is required.'],
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required.'],
    },
    bankName: { type: String, required: [true, 'Bank name is required.'] },
    IFSCCode: { type: String, required: [true, 'IFSC code is required.'] },
    branchName: { type: String, required: [true, 'Branch name is required.'] },

    // Transport Information
    route: { type: String },
    vehicleNumber: { type: String },
    pickupPoint: { type: String },

    // Hostel Information
    hostelName: { type: String },
    roomNumber: { type: String },

    // Previous School
    previousSchool: { type: Boolean, required: false },
    previousSchoolName: { type: String, required: false },
    previousSchoolPosition: { type: String, required: false },
    previousSchoolRating: { type: String },
    previousSchoolAddress: { type: String, required: false },

    // Documents
    resume: { type: String, required: [true, 'Resume is required.'] },
    joiningLetter: {
      type: String,
      required: [true, 'Joining letter is required.'],
    },

    // Soft delete
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

TeacherSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

TeacherSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true }, status: 'Active' });
  next();
});

TeacherSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: { $ne: true }, status: 'Active' },
  });
  next();
});

export const Teacher: Model<TTeacher> = mongoose.model<TTeacher>(
  'Teacher',
  TeacherSchema,
);
