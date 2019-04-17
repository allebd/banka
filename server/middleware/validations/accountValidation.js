/* eslint-disable consistent-return */
import statusCodes from '../../helpers/statusCodes';

/**
 * @class AccountValidate
 */
class AccountValidate {
  static validateCreate(request, response, next) {
    const { type } = request.body;

    if (!type || type.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'No account type selected',
      });
    }

    if (type !== 'savings' && type !== 'current') {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Account Type must be either savings or current',
      });
    }

    next();
  }

  static validateStatusChange(request, response, next) {
    const { status } = request.body;
    // eslint-disable-next-line no-unused-vars
    let { accountNumber } = request.params;
    accountNumber = parseInt(accountNumber, 10);

    if (!status || status.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'No status selected',
      });
    }

    if (status !== 'activate' && status !== 'deactivate') {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Wrong status selected',
      });
    }

    next();
  }
}

export default AccountValidate;
