import { Student } from './student.model';

const findLastStudentIdForYear = async (year: string) => {
  const lastStudent = await Student.findOne({
    studentId: new RegExp(`S-${year}`), // Match IDs starting with S-YY
  })
    .sort({ createdAt: -1 }) // Get the most recent student for the year
    .select('studentId')
    .lean();

  return lastStudent?.studentId
    ? lastStudent.studentId.substring(4)
    : undefined;
};

export const generateStudentId = async (admissionDate: string) => {
  const admissionYear = new Date(admissionDate)
    .getFullYear()
    .toString()
    .slice(-2);

  let currentId = await findLastStudentIdForYear(admissionYear);

  if (!currentId) {
    // If no student exists for the given year, start from '0001'
    currentId = '0000';
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return `S-${admissionYear}${incrementId}`;
};

const findLastStudentRollForClass = async (year: string, className: string) => {
  const lastStudent = await Student.findOne({
    admissionDate: new RegExp(`-${year}$`), // Match any date ending with '-YYYY'
    class: className,
  })
    .sort({ roll: -1 })
    .select('roll')
    .lean();

  return lastStudent?.roll ? lastStudent.roll : undefined;
};

export const generateStudentRoll = async (
  admissionDate: string,
  className: string,
) => {
  const formattedDate = formatDateToDDMMYYYY(admissionDate); // Normalize date format

  const admissionYear = formattedDate.split('-')[2]; // Extract '2025' from '05-03-2025'

  // Generate Roll Number Based on Class
  const lastRoll = await findLastStudentRollForClass(admissionYear, className);
  const newRoll = lastRoll ? (Number(lastRoll) + 1).toString() : 1;

  return newRoll;
};

const formatDateToDDMMYYYY = (dateString: string): string => {
  const date = new Date(dateString); // Convert input to Date object
  if (isNaN(date.getTime())) throw new Error('Invalid date format'); // Handle invalid dates

  const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`; // Return in 'DD-MM-YYYY' format
};
