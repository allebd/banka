import accountController from '../controllers/accountController';
import accountValidation from '../middleware/validations/accountValidation';
import authenticate from '../middleware/authenticate';

const API_VERSION = '/api/v1';

const accountRoute = (app) => {
  app.post(`${API_VERSION}/accounts`, authenticate, accountValidation.validateCreate, accountController.createAccount);
  app.patch(`${API_VERSION}/account/:accountNumber`, authenticate, accountValidation.validateStatusChange, accountController.changeAccountStatus);
  app.delete(`${API_VERSION}/accounts/:accountNumber`, authenticate, accountController.deleteAccount);
  app.get(`${API_VERSION}/accounts/:accountNumber/transactions`, authenticate, accountController.accountTransactions);
};

export default accountRoute;
