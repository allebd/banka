import moment from 'moment';
import utils from '../helpers/common';
import dummy from '../models/dummyData';
import statusCodes from '../helpers/statusCodes';

/**
 * @class TransactionController
 */
class TransactionController {
  /**
   * credits account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof TransactionController
   */

  static creditAccount(request, response) {
    let { amount } = request.body;
    let { accountNumber } = request.params;
    const { id } = request.decode;
    accountNumber = parseInt(accountNumber, 10);
    amount = parseFloat(amount);

    const foundAccount = utils.searchByAccount(accountNumber, dummy.account);
    if (!foundAccount) { return response.status(404).json({ status: statusCodes.notFound, error: 'Account number does not exist' }); }

    const transactionData = {
      id: utils.getNextId(dummy.transaction),
      createdOn: moment().format(),
      type: 'credit',
      accountNumber,
      cashier: id,
      amount,
      oldBalance: parseFloat(foundAccount.balance).toFixed(2),
      newBalance: parseFloat(foundAccount.balance) + parseFloat(amount),
    };
    dummy.transaction.push(transactionData);
    foundAccount.balance = transactionData.newBalance;

    return response.status(200).json({
      status: statusCodes.success,
      data: {
        transactionId: transactionData.id,
        accountNumber,
        amount: parseFloat(amount).toFixed(2),
        cashier: transactionData.cashier,
        transactionType: transactionData.type,
        accountBalance: parseFloat(transactionData.newBalance).toFixed(2),
      },
    });
  }

  /**
   * debits account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof TransactionController
   */

  // eslint-disable-next-line consistent-return
  static debitAccount(request, response) {
    let { amount } = request.body;
    let { accountNumber } = request.params;
    const { id } = request.decode;
    accountNumber = parseInt(accountNumber, 10);
    amount = parseFloat(amount);

    const foundAccount = utils.searchByAccount(accountNumber, dummy.account);
    if (!foundAccount) { return response.status(404).json({ status: statusCodes.notFound, error: 'Account number does not exist' }); }

    const amountToBeLeft = parseFloat(foundAccount.balance) - parseFloat(amount);
    if (amountToBeLeft <= 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Insufficients Funds' }); }

    const transactionData = {
      id: utils.getNextId(dummy.transaction),
      createdOn: moment().format(),
      type: 'debit',
      accountNumber,
      cashier: id,
      amount,
      oldBalance: parseFloat(foundAccount.balance).toFixed(2),
      newBalance: parseFloat(amountToBeLeft).toFixed(2),
    };
    dummy.transaction.push(transactionData);
    foundAccount.balance = transactionData.newBalance;

    return response.status(200).json({
      status: statusCodes.success,
      data: {
        transactionId: transactionData.id,
        accountNumber,
        amount: parseFloat(amount).toFixed(2),
        cashier: transactionData.cashier,
        transactionType: transactionData.type,
        accountBalance: parseFloat(transactionData.newBalance).toFixed(2),
      },
    });
  }
}

export default TransactionController;
