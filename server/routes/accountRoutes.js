/* eslint-disable max-len */
import accountController from '../controllers/accountController';
import accountValidation from '../middleware/validations/accountValidation';
import authenticate from '../middleware/authenticate';
import verifyAdminStaff from '../middleware/validations/verifyAdminStaff';

const API_VERSION = '/api/v1';

const accountRoute = (app) => {
  app.post(`${API_VERSION}/accounts`, authenticate, accountValidation.validateCreate, accountController.createAccount);
  app.patch(`${API_VERSION}/account/:accountNumber`, authenticate, verifyAdminStaff, accountValidation.validateStatusChange, accountController.changeAccountStatus);
  app.delete(`${API_VERSION}/accounts/:accountNumber`, authenticate, verifyAdminStaff, accountController.deleteAccount);
  app.get(`${API_VERSION}/accounts/:accountNumber/transactions`, authenticate, accountController.accountTransactions);
  app.get(`${API_VERSION}/accounts/:accountNumber`, authenticate, accountController.checkAccountNumber);
  app.get(`${API_VERSION}/accounts`, authenticate, verifyAdminStaff, accountController.checkAccounts);
};

export default accountRoute;
