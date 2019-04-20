import transactionController from '../controllers/transactionController';
import transactionValidation from '../middleware/validations/transactionValidation';
import authenticate from '../middleware/authenticate';

const API_VERSION = '/api/v1';

const transactionRoute = (app) => {
  app.post(`${API_VERSION}/transactions/:accountNumber/credit`, authenticate, transactionValidation.validateAmount, transactionController.creditAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/debit`, authenticate, transactionValidation.validateAmount, transactionController.debitAccount);
};

export default transactionRoute;
