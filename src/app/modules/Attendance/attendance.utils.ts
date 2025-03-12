import { TAttendance } from './attendance.interface';

export const attendanceKeys: (keyof TAttendance)[] = [
  'present',
  'absent',
  'office_time',
  'in_time',
  'out_time',
  'late_status',
];



export const getCreatedIdForUser = (existingUser: any, role: string): string => {
  if (role === 'student') {
    return existingUser.studentId;
  } else if (role === 'teacher') {
    return existingUser.teacherId;
  } else if (role === 'staff') {
    return existingUser.staffId;
  } else if (role === 'accountant') {
    return existingUser.accountantId;
  } else {
    throw new Error(`Invalid role: ${role}`);
  }
};