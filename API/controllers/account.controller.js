import moment from 'moment';
import utils from '../helpers/common';
import dummy from '../models/dummyData';
import statusCodes from '../helpers/statusCodes';

/**
 * @class AccountController
 */
class AccountController {
  /**
   * creates new account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */

  // eslint-disable-next-line consistent-return
  static createAccount(request, response) {
    const { type } = request.body;
    const {
      id, firstName, lastName, email,
    } = request.decode;

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

    if (!utils.generateAccountNumber(dummy.account)) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Account could not be created',
      });
    }

    const accountData = {
      id: utils.getNextId(dummy.account),
      accountNumber: utils.generateAccountNumber(dummy.account),
      createdOn: moment().format(),
      owner: id,
      type,
      status: 'draft',
      balance: 0.00,
    };
    dummy.account.push(accountData);

    response.status(201).json({
      status: statusCodes.created,
      data: {
        accountNumber: accountData.accountNumber,
        firstName,
        lastName,
        email,
        type: accountData.type,
        openingBalance: accountData.balance,
      },
    });
  }

  /**
   * changes account status
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  // eslint-disable-next-line consistent-return
  static changeAccountStatus(request, response) {
    const { status } = request.body;
    let { accountNumber } = request.params;
    accountNumber = parseInt(accountNumber, 10);

    const foundAccount = utils.searchByAccount(accountNumber, dummy.account);

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

    if (!foundAccount) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Account number does not exists',
      });
    }
    foundAccount.status = status;

    response.status(200).json({
      status: statusCodes.success,
      data: {
        accountNumber,
        status,
      },
    });
  }

  static invalidAccountRequest(request, response) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Request is not valid',
    });
  }
}

export default AccountController;
