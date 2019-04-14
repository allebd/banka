import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const helpers = {
  /**
   * @description - generates a new id
   * @param {object} data
   * @returns {int} id
   */
  getNextId(data) {
    const lastId = data[data.length - 1].id;
    return lastId + 1;
  },

  /**
   * @description - generates a new account number
   * @param {object} data
   * @returns {int} accountNumber
   */
  generateAccountNumber(data) {
    const newAccountNumber = Math.floor(Math.random() * 9000000) + 2550000000;
    const foundAccount = data.find(eachData => eachData.accountNumber === newAccountNumber);
    if (!foundAccount) {
      return newAccountNumber;
    }
    return 0;
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

  /**
   * @description - search by email
   * @param {string} email
   * @param {object} data
   * @returns {object} foundEmail
   */
  searchByEmail(searchEmail, data) {
    const foundEmail = data.find(eachData => eachData.email === searchEmail);
    return foundEmail;
  },

  /**
   * @description - search by id
   * @param {int} id
   * @param {object} data
   * @returns {object} foundId
   */
  searchById(searchId, data) {
    const foundId = data.find(eachData => eachData.id === searchId);
    return foundId;
  },

  /**
   * @description - search by account number
   * @param {int} accountNumber
   * @param {object} data
   * @returns {object} foundAccount
   */
  searchByAccount(searchAccount, data) {
    const foundAccount = data.find(eachData => eachData.accountNumber === searchAccount);
    return foundAccount;
  },
  /**
   * @description - validates email
   * @param {string} emaIl;
   * @returns {Boolean} isValid
   */
  emailValidator(email) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = reg.test(email);
    return isValid;
  },
};

export default helpers;
