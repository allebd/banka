import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusCodes from '../helpers/statusCodes';

dotenv.config();

const { SECRET } = process.env;

const authentication = (request, response, next) => {
  try {
    const header = request.headers.authorization;
    if (!header || header === '') {
      return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Authentication failed' });
    }
    const token = jwt.verify(header, SECRET);
    request.decode = token;
    next();
  } catch (e) {
    return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Invalid token!' });
  }
};

export default authentication;
