import { z } from 'zod';

// Validation schema for teacher creation
const teacherValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required.' }),
    profileImage: z.string({ required_error: 'Profile image is required.' }),
    firstName: z.string({ required_error: 'First name is required.' }),
    lastName: z.string({ required_error: 'Last name is required.' }),
    category: z.string({ required_error: 'Category is required.' }),
    joiningDate: z.string({ required_error: 'Joining date is required.' }),
    subject: z.string({ required_error: 'Subject is required.' }),
    gender: z.string({ required_error: 'Gender is required.' }),
    dateOfBirth: z.string({ required_error: 'Date of birth is required.' }),
    bloodGroup: z.string({ required_error: 'Blood group is required.' }),
    maritalStatus: z.string({ required_error: 'Marital status is required.' }),
    religion: z.string({ required_error: 'Religion is required.' }),
    contactNumber: z.string({ required_error: 'Contact number is required.' }),
    alternativeContactNumber: z.string().optional(),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address.' }),
    nidNumber: z.string({ required_error: 'NID number is required.' }),
    educationalQualification: z.string({
      required_error: 'Educational qualification is required.',
    }),
    motherTongue: z.string({ required_error: 'Mother tongue is required.' }),
    status: z.enum(['Active', 'Inactive'], {
      required_error: 'Status is required.',
    }),

    // Payroll info
    EPFNo: z.string().optional(),
    basicSalary: z.string({ required_error: 'Basic salary is required.' }),
    workLocation: z.string({ required_error: 'Work location is required.' }),
    contractType: z.string({ required_error: 'Contract type is required.' }),
    workShift: z.string({ required_error: 'Work shift is required.' }),

    // Parents info
    fatherName: z.string({ required_error: 'Father name is required.' }),
    fatherEmail: z.string().optional(),
    fatherContactNumber: z.string({
      required_error: 'Father contact number is required.',
    }),
    fatherOccupation: z.string({
      required_error: 'Father occupation is required.',
    }),
    fatherNidNumber: z.string({
      required_error: 'Father NID number is required.',
    }),
    motherName: z.string({ required_error: 'Mother name is required.' }),
    motherEmail: z.string().optional(),
    motherContactNumber: z.string({
      required_error: 'Mother contact number is required.',
    }),
    motherOccupation: z.string({
      required_error: 'Mother occupation is required.',
    }),
    motherNidNumber: z.string({
      required_error: 'Mother NID number is required.',
    }),

    // Address
    presentAddress: z.string({
      required_error: 'Present address is required.',
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required.',
    }),

    // Bank account details
    accountName: z.string({ required_error: 'Account name is required.' }),
    accountNumber: z.string({ required_error: 'Account number is required.' }),
    bankName: z.string({ required_error: 'Bank name is required.' }),
    IFSCCode: z.string({ required_error: 'IFSC code is required.' }),
    branchName: z.string({ required_error: 'Branch name is required.' }),

    // Transport Information
    route: z.string().optional(),
    vehicleNumber: z.string().optional(),
    pickupPoint: z.string().optional(),

    // Hostel Information
    hostelName: z.string().optional(),
    roomNumber: z.string().optional(),

    // Previous School
    previousSchool: z.boolean({
      required_error: 'Previous school status is required.',
    }),
    previousSchoolName: z.string().optional(),
    previousSchoolPosition: z.string().optional(),
    previousSchoolRating: z.string().optional(),
    previousSchoolAddress: z.string().optional(),

    // Documents
    resume: z.string({ required_error: 'Resume is required.' }),
    joiningLetter: z.string({ required_error: 'Joining letter is required.' }),
  }),
});

// Validation schema for updating teacher details
const updateTeacherValidationSchema = teacherValidationSchema.partial();

// Export validation schemas
export const teacherValidation = {
  teacherValidationSchema,
  updateTeacherValidationSchema,
};
