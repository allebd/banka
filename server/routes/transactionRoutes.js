/* eslint-disable max-len */
import transactionController from '../controllers/transactionController';
import transactionValidation from '../middleware/validations/transactionValidation';
import authenticate from '../middleware/authenticate';
import verifyStaff from '../middleware/validations/verifyStaff';

const API_VERSION = '/api/v1';

const transactionRoute = (app) => {
  app.post(`${API_VERSION}/transactions/:accountNumber/credit`, authenticate, verifyStaff, transactionValidation.validateAmount, transactionController.creditAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/debit`, authenticate, verifyStaff, transactionValidation.validateAmount, transactionController.debitAccount);
  app.get(`${API_VERSION}/transactions/:transactionId`, authenticate, transactionValidation.validateTransaction, transactionController.checkTransaction);
};

export default transactionRoute;
