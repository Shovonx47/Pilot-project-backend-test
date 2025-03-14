import { Types } from 'mongoose';

export interface TSibling {
  siblingName: string;
  class: string;
  section: string;
  gender: string;
  roll: string;
  motherTongue: string;
}

// Interface for Student
export interface TStudent {
  auth: Types.ObjectId;

  attendance: Types.ObjectId[];
  userId: string;
  studentId: string;
  profileImage: string;
  academicYear: string;
  admissionDate: string;
  status: 'Active' | 'Inactive';
  category: string;
  firstName: string;
  lastName: string;
  previousClass?: string[];
  class: string;
  roll: string;
  previousClassRoll?: string[];
  section: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  religion: string;
  contactNumber: string;
  email: string;
  board: string;
  motherTongue: string;

  presentAddress: string;
  permanentAddress: string;

  previousSchoolName: string;
  previousClassName: string;
  previousSchoolAddress: string;
  previousClassGpa: string;
  siblings: TSibling[];

  //  guardian details

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

  localGuardianName: string;
  relationshipWithLocalGuardian: string;
  localGuardianEmail: string;
  localGuardianContactNumber: string;
  localGuardianOccupation: string;
  localGuardianNidNumber: string;

  // Transport Information

  route?: string;
  vehicleNumber?: string;
  pickupPoint?: string;

  // Hostel Information

  hostelName?: string;
  roomNumber?: string;

  // Documents
  transferCertificate: string;
  birthCertificate: string;

  isDeleted: boolean;
}

// export interface TMigrationClass {
//   previousClassRoll: string;
//   previousClass: string;
//   roll?: string;
//   class: string;
// }
