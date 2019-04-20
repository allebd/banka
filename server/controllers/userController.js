import moment from 'moment';
import utils from '../helpers/common';
import dummy from '../models/dummyData';
import statusCodes from '../helpers/statusCodes';

/**
 * @class UserController
 */
class UserController {
  /**
   * creates new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static signup(request, response) {
    const {
      firstName, lastName, email, password,
    } = request.body;

    if (utils.searchByEmail(email, dummy.users)) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email already exists',
      });
    }

    const userData = {
      id: utils.getNextId(dummy.users),
      email,
      firstName,
      lastName,
      password: utils.hashPassword(password),
      type: 'client',
      registered: moment().format(),
      isAdmin: false,
    };
    dummy.users.push(userData);

    const token = utils.jwtToken(userData);

    return response.header('Authorization', `${token}`).status(201).json({
      status: statusCodes.created,
      data: {
        token,
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      },
    });
  }

  /**
   * logs a user in
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static signin(request, response) {
    const { email, password } = request.body;

    const userData = {
      email,
      password,
    };

    const storedUser = utils.searchByEmail(email, dummy.users);
    if (storedUser) {
      if (utils.validatePassword(userData.password, storedUser.password)) {
        const token = utils.jwtToken(storedUser);
        return response.header('Authorization', `${token}`).status(200).json({
          status: statusCodes.success,
          data: {
            token,
            id: storedUser.id,
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            email: storedUser.email,
          },
        });
      }
    }

    return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Invalid login details, email or password is wrong' });
  }
}

export default UserController;
