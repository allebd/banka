import userController from '../controllers/userController';
import userValidation from '../middleware/validations/userValidation';
// import authenticate from '../middleware/authenticate';

const API_VERSION = '/api/v1';

const userRoute = (app) => {
  // app.post(`${API_VERSION}/auth/signup`, userValidation.validateSignup, userController.signup);
  // app.post(`${API_VERSION}/auth/signin`, userValidation.validateSignin, userController.signin);
  // app.get(`${API_VERSION}/user/:userEmail/accounts`, authenticate, userController.checkAccounts);
  // app.post(`${API_VERSION}/user/admin`, userValidation.validateSignup, userController.signup);

  app.post(`${API_VERSION}/auth/signup`, userValidation.validateSignup, userController.signup);
  app.post(`${API_VERSION}/auth/signin`, userValidation.validateSignin, userController.signin);
  app.get(`${API_VERSION}/user/:userEmail/accounts`, userController.checkAccounts);
};

export default userRoute;
