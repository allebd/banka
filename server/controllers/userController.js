import moment from 'moment';
import utils from '../helpers/common';
import statusCodes from '../helpers/statusCodes';
import pool from '../models/database';
import { getUserByEmail, addUser, getAccountByOwnerId } from '../models/queries';

/**
 * @class UserController
 */
class UserController {
  /**
   * create new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static signup(request, response) {
    try {
      const {
        firstName, lastName, email, password, type,
      } = request.body;

      let userType = 'client';
      let adminType = false;

      if (type) {
        userType = type;
        if (userType === 'admin') {
          adminType = true;
          userType = 'staff';
        }
      }

      const data = {
        email,
        firstName,
        lastName,
        password: utils.hashPassword(password),
        registered: moment().format(),
        type: userType,
        isAdmin: adminType,
      };

      pool.connect((err, client, done) => {
        client.query(addUser(data), (error, result) => {
          done();
          if (error) {
            if (error.code === '23505') {
              return response.status(400).json({
                status: statusCodes.badRequest,
                error: 'Email already exists',
              });
            }
          }

          const user = result.rows[0];
          const tokenData = {
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            type: user.type,
            isAdmin: user.isadmin,
          };
          const token = utils.jwtToken(tokenData);
          const {
            firstname, lastname, email, id,
          } = user;

          return response.status(201).json({
            status: statusCodes.created,
            data: [{
              token,
              id,
              firstName: firstname,
              lastName: lastname,
              email,
            }],
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * log a user in
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static signin(request, response) {
    try {
      const { email, password } = request.body;

      pool.connect((err, client, done) => {
        client.query(getUserByEmail(email), (error, result) => {
          done();
          const user = result.rows[0];
          if (!user) {
            return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Invalid login details, email or password is wrong' });
          }
          if (utils.validatePassword(password, user.password)) {
            const tokenData = {
              id: user.id,
              email: user.email,
              type: user.type,
              isAdmin: user.isadmin,
            };
            const token = utils.jwtToken(tokenData);

            const {
              firstname, lastname, email, id,
            } = user;

            return response.status(200).json({
              status: statusCodes.success,
              data: [{
                token,
                id,
                firstName: firstname,
                lastName: lastname,
                email,
              }],
            });
          }
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * check user accounts
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static checkAccounts(request, response) {
    try {
      const { userEmail } = request.params;

      pool.connect((err, client, done) => {
        client.query(getUserByEmail(userEmail), (error, result) => {
          done();
          const user = result.rows[0];
          if (!user) {
            return response.status(404).json({ status: statusCodes.notFound, error: 'User does not exist' });
          }

          client.query(getAccountByOwnerId(user.id), (accountError, accountResult) => {
            done();
            if (accountResult.rows.length === 0) {
              return response.status(404).json({ status: statusCodes.notFound, error: 'User has no account created' });
            }
            return response.status(200).json({
              status: statusCodes.success,
              data: accountResult.rows,
            });
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }
}

export default UserController;
