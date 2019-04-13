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

  // eslint-disable-next-line consistent-return
  static signup(request, response) {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = request.body;

    if (!firstName || firstName.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'First name is required',
      });
    }

    if (!lastName || lastName.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Last name is required',
      });
    }

    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }

    if (email) {
      const isValid = utils.emailValidator(email);
      if (!isValid) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Invalid email address',
        });
      }
    }

    if (!password || password.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Password is required',
      });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Passwords do not match',
      });
    }

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

    response.header('Authorization', `${token}`).status(201).json({
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
    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }

    if (email) {
      const isValid = utils.emailValidator(email);
      if (!isValid) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Invalid email address',
        });
      }
    }

    if (!password || password.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Password is required',
      });
    }

    const userData = {
      email,
      password,
    };

    const storedUser = utils.searchByEmail(email, dummy.users);
    if (!storedUser) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Invalid login details, email or password is wrong',
      });
    }

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

    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Invalid login details, email or password is wrong',
    });
  }

  static invalidUserRequest(request, response) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Request is not valid',
    });
  }
}

export default UserController;
