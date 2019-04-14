import userController from '../controllers/user.controller';
import accountController from '../controllers/account.controller';
import transactionController from '../controllers/transaction.controller';
import authenticate from '../middleware/authenticate';

const API_VERSION = '/api/v1';

const route = (app) => {
  app.post(`${API_VERSION}/auth/signup`, userController.signup);
  app.post(`${API_VERSION}/auth/signin`, userController.signin);
  app.post(`${API_VERSION}/accounts`, authenticate, accountController.createAccount);
  app.patch(`${API_VERSION}/accounts/:accountNumber`, authenticate, accountController.changeAccountStatus);
  app.delete(`${API_VERSION}/accounts/:accountNumber`, authenticate, accountController.deleteAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/credit`, authenticate, transactionController.creditAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/debit`, authenticate, transactionController.debitAccount);
};

export default route;
