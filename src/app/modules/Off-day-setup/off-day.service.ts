import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TOffDaySetup } from './off-day.interface';
import { OffDaySetup } from './off-day.model';

const createOffDaySetupIntoDB = async (payload: TOffDaySetup) => {
  // Check if OffDaySetup already exists
  for (const offDay of payload.offDays) {
    const existingOffDaySetup = await OffDaySetup.findOne({
      'offDays.startDate': offDay.startDate,
      'offDays.startDay': offDay.startDay,
      'offDays.title': offDay.title,
    });

    if (existingOffDaySetup) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `An off-day setup already exists for ${offDay.startDate} on ${offDay.startDay} with the title "${offDay.title}". Please choose a different day or date.`,
      );
    }
  }
  // Sanitize and prepare the OffDaySetup payload
  const sanitizedPayload = sanitizePayload(payload);
  const OffDaySetupData = new OffDaySetup({ ...sanitizedPayload });

  // Save the OffDaySetup data
  const savedOffDaySetup = await OffDaySetupData.save();

  return savedOffDaySetup;
};

const getAllOffDaySetupsFromDB = async (query: Record<string, unknown>) => {
  const offDaySetupQuery = new QueryBuilder(OffDaySetup.find(), query)
    .sort()
    .paginate();

  const meta = await offDaySetupQuery.countTotal();
  const data = await offDaySetupQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleOffDaySetupDetails = async (id: string) => {
  const singleOffDaySetup = await OffDaySetup.findById(id);

  if (!singleOffDaySetup) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No off day found');
  }

  return singleOffDaySetup;
};

const updateOffDaySetupInDB = async (id: string, payload: TOffDaySetup) => {
  // Check if any of the new offDays already exist, excluding the current setup
  for (const offDay of payload.offDays) {
    const existingOffDaySetup = await OffDaySetup.findOne({
      _id: { $ne: id }, // Exclude the current document from the check
      'offDays.startDate': offDay.startDate,
      'offDays.startDay': offDay.startDay,
      'offDays.title': offDay.title,
    });

    if (existingOffDaySetup) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `An off-day setup already exists for ${offDay.startDate} on ${offDay.startDay} with the title "${offDay.title}". Please choose a different day or date.`,
      );
    }
  }
  // Ensure this class routine is not the one being updated

  const sanitizeData = sanitizePayload(payload);

  const updatedOffDaySetup = await OffDaySetup.findByIdAndUpdate(
    id,
    sanitizeData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedOffDaySetup) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Off day not found.');
  }

  return updatedOffDaySetup;
};

const deleteOffDaySetupFromDB = async (id: string) => {
  // Find the OffDaySetup by ID
  const offDay = await OffDaySetup.findById(id);

  // Check if OffDaySetup exists
  if (!offDay) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Off day not found.');
  }

  // Mark the OffDaySetup as deleted
  offDay.isDeleted = true;

  // Save changes to the database
  await offDay.save();

  return offDay;
};

export const OffDaySetupServices = {
  createOffDaySetupIntoDB,
  getAllOffDaySetupsFromDB,
  getSingleOffDaySetupDetails,
  updateOffDaySetupInDB,
  deleteOffDaySetupFromDB,
};
