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

    if (!foundAccount) {
      return response.status(404).json({
        status: statusCodes.notFound,
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

  /**
   * Delete account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  // eslint-disable-next-line consistent-return
  static deleteAccount(request, response) {
    let { accountNumber } = request.params;
    accountNumber = parseInt(accountNumber, 10);

    const foundAccount = utils.searchByAccount(accountNumber, dummy.account);

    if (!foundAccount) {
      return response.status(404).json({
        status: statusCodes.notFound,
        error: 'Account number does not exists',
      });
    }

    const index = dummy.account.indexOf(foundAccount);

    dummy.account.splice(index, 1);
    response.status(200).send({ status: statusCodes.success, message: 'Account successfully deleted' });
  }
}

export default AccountController;
