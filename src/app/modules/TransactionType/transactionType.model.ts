import { model, Schema } from 'mongoose';
import { Type_of_Transaction } from './transactionType.constant';
import { ITransactionType } from './transactionType.interface';

const transactionTypeSchema = new Schema<ITransactionType>(
  {
    type: {
      type: String,
      enum: Object.values(Type_of_Transaction),
      required: [true, 'Transaction type is required.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
    },
    subCategory: {
      type: String,
      required: [true, 'Sub-category is required.'],
    },
    note: { type: String },
  },
  {
    timestamps: true,
  },
);

export const TransactionType = model<ITransactionType>(
  'TransactionType',
  transactionTypeSchema,
);
