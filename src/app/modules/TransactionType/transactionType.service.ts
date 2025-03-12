import { ITransactionType } from './transactionType.interface';
import { TransactionType } from './transactionType.model';

const createTransactionTypeIntoDB = async (payload: ITransactionType) => {
  const transactionType = await TransactionType.create(payload);
  return transactionType;
};

const getAllTransactionTypeFromDB = async (query: Record<string, unknown>) => {
  const transactionType = await TransactionType.find(query);
  return transactionType;
};

const getSingleTransactionTypeFromDB = async (transactionTypeId: string) => {
  const transactionType = await TransactionType.findById(transactionTypeId);
  return transactionType;
};

const updateTransactionTypeIntoDB = async (
  transactionTypeId: string,
  payload: ITransactionType,
) => {
  const transactionType = await TransactionType.findByIdAndUpdate(
    transactionTypeId,
    payload,
    {
      new: true,
    },
  );
  return transactionType;
};

const deleteTransactionTypeFromDB = async (transactionTypeId: string) => {
  const transactionType =
    await TransactionType.findByIdAndDelete(transactionTypeId);
  return transactionType;
};

export const TransactionTypeServices = {
  createTransactionTypeIntoDB,
  getAllTransactionTypeFromDB,
  getSingleTransactionTypeFromDB,
  updateTransactionTypeIntoDB,
  deleteTransactionTypeFromDB,
};
