/* eslint-disable consistent-return */
import utils from '../../helpers/common';
import statusCodes from '../../helpers/statusCodes';

/**
 * @class UserValidate
 */
class UserValidate {
  static validateSignup(request, response, next) {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = request.body;

    if (!firstName || firstName.trim().length === 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'First name is required' }); }

    if (!lastName || lastName.trim().length === 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Last name is required' }); }

    if (!email || email.trim().length === 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Email is required' }); }

    if (email) {
      const isValid = utils.emailValidator(email);
      if (!isValid) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Invalid email address' }); }
    }

    if (!password || password.trim().length === 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Password is required' }); }

    if (password !== confirmPassword) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Passwords do not match' }); }

    next();
  }

  static validateSignin(request, response, next) {
    const { email, password } = request.body;
    if (!email || email.trim().length === 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Email is required' }); }

    if (email) {
      const isValid = utils.emailValidator(email);
      if (!isValid) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Invalid email address' }); }
    }

    if (!password || password.trim().length === 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Password is required' }); }

    next();
  }
}

export default UserValidate;
