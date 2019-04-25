/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
import statusCodes from '../../helpers/statusCodes';

/**
 * @class TransactionValidate
 */
class TransactionValidate {
  static validateAmount(request, response, next) {
    const { amount } = request.body;
    const { accountNumber } = request.params;

    if (isNaN(accountNumber) || isNaN(amount)) { return response.status(400).json({ status: statusCodes.badRequest, error: 'A number is expected' }); }

    if (amount === undefined || amount === '' || amount === null) { return response.status(400).json({ status: statusCodes.badRequest, error: 'No amount entered' }); }

    if (amount === 0 || amount < 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Amount is too low' }); }

    next();
  }

  static validateTransaction(request, response, next) {
    const { transactionId } = request.params;

    if (isNaN(transactionId)) { return response.status(400).json({ status: statusCodes.badRequest, error: 'A number is expected' }); }

    next();
  }
}

export default TransactionValidate;
