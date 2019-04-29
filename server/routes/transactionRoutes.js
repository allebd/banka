import dotenv from 'dotenv';
import transactionController from '../controllers/transactionController';
import authenticate from '../middleware/authentications';
import { staffRole } from '../middleware/permissions';
import { validateAmount, validateTransaction } from '../middleware/validations';

dotenv.config();

const API_VERSION = '/api/v1';

const transactionRoute = (app) => {
  app.post(`${API_VERSION}/transactions/:accountNumber/credit`, authenticate, staffRole, validateAmount, transactionController.creditAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/debit`, authenticate, staffRole, validateAmount, transactionController.debitAccount);
  app.get(`${API_VERSION}/transactions/:transactionId`, authenticate, validateTransaction, transactionController.checkTransaction);
};

export default transactionRoute;
