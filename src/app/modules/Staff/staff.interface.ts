import { Types } from 'mongoose';

export interface TStaff {
  auth: Types.ObjectId;
  attendance: Types.ObjectId[];
  userId: string;
  staffId: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  category: string;
  joiningDate: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  maritalStatus: string;
  religion: string;
  contactNumber: string;
  alternativeContactNumber?: string;
  email: string;
  nidNumber: string;
  educationalQualification: string;
  motherTongue: string;
  status: 'Active' | 'Inactive';

  // payroll info
  EPFNo?: string;
  basicSalary: string;
  workLocation: string;
  contractType: string;
  workShift: string;

  // parents info

  fatherName: string;
  fatherEmail: string;
  fatherContactNumber: string;
  fatherOccupation: string;
  fatherNidNumber: string;

  motherName: string;
  motherEmail: string;
  motherContactNumber: string;
  motherOccupation: string;
  motherNidNumber: string;

  // address

  presentAddress: string;
  permanentAddress: string;

  // bank account details

  accountName: string;
  accountNumber: string;
  bankName: string;
  IFSCCode: string;
  branchName: string;

  // Transport Information

  route?: string;
  vehicleNumber?: string;
  pickupPoint?: string;

  // Hostel Information

  hostelName?: string;
  roomNumber?: string;

  // previous school

  previousSchool: boolean;
  previousSchoolName: string;
  previousSchoolPosition: string;
  previousSchoolRating?: string;
  previousSchoolAddress: string;

  // Documents
  resume: string;
  joiningLetter: string;

  isDeleted: boolean;
}
