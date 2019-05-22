import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const helpers = {
  /**
   * @description - generates a new account number
   * @param {object} data
   * @returns {int} accountNumber
   */
  generateAccountNumber() {
    const newAccountNumber = Math.floor(Math.random() * 9000000) + 2550000000;
    return newAccountNumber;
  },

  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashPassword
   */

  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  },

  /**
   * @description - validate password
   * @param {string} password
   * @param {string} hashPassword
   * @returns {boolean} boolean
   */
  validatePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * @description - assigns token
   * @param {object} payload
   * @returns {object} token
   */
  jwtToken(payload) {
    const token = jwt.sign(payload, SECRET, {
      expiresIn: '24h', // expires in 24 hours
    });
    return token;
  },
};

export default helpers;
