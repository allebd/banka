import userController from '../controllers/userController';
import userValidation from '../middleware/validations/userValidation';

const API_VERSION = '/api/v1';

const userRoute = (app) => {
  app.post(`${API_VERSION}/auth/signup`, userValidation.validateSignup, userController.signup);
  app.post(`${API_VERSION}/auth/signin`, userValidation.validateSignin, userController.signin);
};

export default userRoute;
