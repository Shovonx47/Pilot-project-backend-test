import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TExaminationSchedule } from './exam-schedule.interface';
import { ExaminationSchedule } from './exam-schedule.model';
import moment from 'moment';

const createExaminationScheduleIntoDB = async (
  payload: TExaminationSchedule,
) => {
  // Check if ExamSetting already exists

  const existingExamSetting = await ExaminationSchedule.findOne({
    class: payload.class,
    examName: payload.examName,
    examYear: payload.examYear,
  });

  if (existingExamSetting) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `An exam result already exists for ${payload.class} on ${payload.examName}.`,
    );
  }

  // Calculate durationMinutes based on startTime and endTime
  const updatedExams = payload.exams.map((exam) => {
    if (exam.startTime && exam.endTime) {
      const start = moment(exam.startTime, 'HH:mm'); // Parse as 24-hour format
      const end = moment(exam.endTime, 'HH:mm');
      const durationMinutes = end.diff(start, 'minutes');

      if (durationMinutes <= 0) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `End time must be after start time for ${exam.courseName}.`,
        );
      }

      return { ...exam, durationMinutes: durationMinutes.toString() };
    }
    return exam;
  });

  // Sanitize and prepare the ExamSetting payload
  const sanitizedPayload = sanitizePayload({ ...payload, exams: updatedExams });
  const examSettingData = new ExaminationSchedule({ ...sanitizedPayload });

  // Save the ExamSetting data
  const savedExamSetting = await examSettingData.save();

  return savedExamSetting;
};

const getAllExaminationSchedulesFromDB = async (
  query: Record<string, unknown>,
) => {
  const examinationScheduleQuery = new QueryBuilder(
    ExaminationSchedule.find(),
    query,
  )
    .sort()
    .paginate();

  const meta = await examinationScheduleQuery.countTotal();
  const data = await examinationScheduleQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleExaminationScheduleDetails = async (id: string) => {
  const singleExaminationSchedule = await ExaminationSchedule.findById(id);

  if (!singleExaminationSchedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No exam schedule found');
  }

  return singleExaminationSchedule;
};

const updateExaminationScheduleInDB = async (
  id: string,
  payload: TExaminationSchedule,
) => {
  const updatedExams = payload.exams.map((exam) => {
    if (exam.startTime && exam.endTime) {
      const start = moment(exam.startTime, 'HH:mm'); // Parse as 24-hour format
      const end = moment(exam.endTime, 'HH:mm');
      const durationMinutes = end.diff(start, 'minutes');

      if (durationMinutes <= 0) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `End time must be after start time for ${exam.courseName}.`,
        );
      }

      return { ...exam, durationMinutes: durationMinutes.toString() };
    }
    return exam;
  });

  const sanitizeData = sanitizePayload({ ...payload, exams: updatedExams });

  const updatedExaminationSchedule =
    await ExaminationSchedule.findByIdAndUpdate(id, sanitizeData, {
      new: true,
      runValidators: true,
    });

  if (!updatedExaminationSchedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Exam schedule not found.');
  }

  return updatedExaminationSchedule;
};

const deleteExaminationScheduleFromDB = async (id: string) => {
  // Find the ExaminationSchedule by ID
  const examinationSchedule = await ExaminationSchedule.findById(id);

  // Check if ExaminationSchedule exists
  if (!examinationSchedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Exam schedule not found.');
  }

  // Mark the ExaminationSchedule as deleted
  examinationSchedule.isDeleted = true;

  // Save changes to the database
  await examinationSchedule.save();

  return examinationSchedule;
};

export const ExaminationScheduleServices = {
  createExaminationScheduleIntoDB,
  getAllExaminationSchedulesFromDB,
  getSingleExaminationScheduleDetails,
  updateExaminationScheduleInDB,
  deleteExaminationScheduleFromDB,
};
