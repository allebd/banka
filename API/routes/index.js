import userController from '../controllers/user.controller';

const API_VERSION = '/api/v1';

const route = (app) => {
  app.post(`${API_VERSION}/auth/signup`, userController.signup);
  app.all(`${API_VERSION}/auth/signup`, userController.invalidUserRequest);
  app.post(`${API_VERSION}/auth/signin`, userController.signin);
  app.all(`${API_VERSION}/auth/signin`, userController.invalidUserRequest);
};

export default route;
