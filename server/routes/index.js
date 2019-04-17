import userController from '../controllers/userController';
import accountController from '../controllers/accountController';
import transactionController from '../controllers/transactionController';
import userValidation from '../middleware/validations/userValidation';
import accountValidation from '../middleware/validations/accountValidation';
import transactionValidation from '../middleware/validations/transactionValidation';
import authenticate from '../middleware/authenticate';

const API_VERSION = '/api/v1';

const route = (app) => {
  app.post(`${API_VERSION}/auth/signup`, userValidation.validateSignup, userController.signup);
  app.post(`${API_VERSION}/auth/signin`, userValidation.validateSignin, userController.signin);
  app.post(`${API_VERSION}/accounts`, authenticate, accountValidation.validateCreate, accountController.createAccount);
  app.patch(`${API_VERSION}/accounts/:accountNumber`, authenticate, accountValidation.validateStatusChange, accountController.changeAccountStatus);
  app.delete(`${API_VERSION}/accounts/:accountNumber`, authenticate, accountController.deleteAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/credit`, authenticate, transactionValidation.validateAmount, transactionController.creditAccount);
  app.post(`${API_VERSION}/transactions/:accountNumber/debit`, authenticate, transactionValidation.validateAmount, transactionController.debitAccount);
};

export default route;
