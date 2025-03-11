import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransactionTypeServices } from './transactionType.service';

const createTransactionType = catchAsync(async (req, res) => {
  const transactionType =
    await TransactionTypeServices.createTransactionTypeIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction type created successful!',
    data: transactionType,
  });
});

const getAllTransactionTypes = catchAsync(async (req, res) => {
  const result = await TransactionTypeServices.getAllTransactionTypeFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Transaction Type retrieved Successfully.',
    data: result,
  });
});

const getSingleTransactionType = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result =
    await TransactionTypeServices.getSingleTransactionTypeFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction Type retrieved Successfully.',
    data: result,
  });
});

const updateTransactionType = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TransactionTypeServices.updateTransactionTypeIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction Type updated Successfully.',
    data: result,
  });
});

const deleteTransactionType = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TransactionTypeServices.deleteTransactionTypeFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction Type deleted Successfully.',
    data: result,
  });
});

export const TransactionTypeController = {
  createTransactionType,
  getAllTransactionTypes,
  getSingleTransactionType,
  updateTransactionType,
  deleteTransactionType,
};
