import dotenv from 'dotenv';
import userController from '../controllers/userController';
import authenticate from '../middleware/authentications';
import { adminRole } from '../middleware/permissions';
import {
  validateSignup, validateSignin, validateNewAdmin, validateEmail,
} from '../middleware/validations';

dotenv.config();

const API_VERSION = '/api/v1';

const userRoute = (app) => {
  app.post(`${API_VERSION}/auth/signup`, validateSignup, userController.signup);
  app.post(`${API_VERSION}/auth/signin`, validateSignin, userController.signin);
  app.get(`${API_VERSION}/user/:userEmail/accounts`, authenticate, validateEmail, userController.checkAccounts);
  app.post(`${API_VERSION}/user/admin`, authenticate, adminRole, validateNewAdmin, userController.signup);
};

export default userRoute;
