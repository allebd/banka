import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes';
import transactionRoutes from './transactionRoutes';

const route = (app) => {
  userRoutes(app);
  accountRoutes(app);
  transactionRoutes(app);
};

export default route;
