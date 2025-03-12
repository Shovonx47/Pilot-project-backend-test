import { Router } from 'express';
import { TransactionController } from '../Transaction/transaction.controller';

const router = Router();

router
  .route('/')
  .post(TransactionController.createTransaction)
  .get(TransactionController.getAllTransaction);

router
  .route('/:id')
  .get(TransactionController.getSingleTransaction)
  .put(TransactionController.updateTransaction)
  .delete(TransactionController.deleteTransaction);

export const TransactionTypeRoutes = router;
