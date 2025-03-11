import { TransactionType } from '../Transaction/transaction.constant';

export interface ITransactionType {
  type: TransactionType;
  category: string;
  subCategory: string;
  note?: string;
}
