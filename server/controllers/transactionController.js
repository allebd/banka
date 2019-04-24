/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import moment from 'moment';
import statusCodes from '../helpers/statusCodes';
import pool from '../models/database';

/**
 * @class TransactionController
 */
class TransactionController {
  /**
   * credit account
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

    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const values = [accountNumber];

      client.query(query, values, (error, result) => {
        done();
        if (error || result.rows.length === 0) {
          response.status(404).json({
            status: statusCodes.notFound,
            error: 'Account number does not exist',
          });
          response.end();
        }

        const account = result.rows[0];
        const { balance } = account;
        const data = {
          createdOn: moment().format(),
          type: 'credit',
          accountNumber,
          cashier: id,
          amount,
          oldBalance: balance,
          newBalance: balance + amount,
        };

        const transactionQuery = `INSERT INTO transactions (
          createdOn,
          type,
          accountNumber,
          cashier,
          amount,
          oldBalance,
          newBalance
          ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const transactionValues = Object.values(data);

        client.query(transactionQuery, transactionValues, (transactionError, transactionResult) => {
          done();
          if (transactionError) {
            response.status(400).json({
              status: statusCodes.badRequest,
              error: transactionError.message,
            });
            response.end();
          }

          const transactionUser = transactionResult.rows[0];

          client.query('UPDATE accounts set balance=$1 WHERE accountnumber=$2 RETURNING *', [data.newBalance, accountNumber], (updateError, updateResult) => {
            done();
            if (updateError) {
              response.status(400).json({
                status: 400,
                error: updateError.message,
              });
              response.end();
            }

            const { cashier, type, newbalance } = transactionUser;
            response.status(200).json({
              status: statusCodes.success,
              data: [{
                transactionId: transactionUser.id,
                accountNumber,
                amount: parseFloat(amount).toFixed(2),
                cashier,
                transactionType: type,
                accountBalance: parseFloat(newbalance).toFixed(2),
              }],
            });
            response.end();
          });
        });
      });
    });
  }

  /**
   * debit account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof TransactionController
   */
  static debitAccount(request, response) {
    let { amount } = request.body;
    let { accountNumber } = request.params;
    const { id } = request.decode;
    accountNumber = parseInt(accountNumber, 10);
    amount = parseFloat(amount);

    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const values = [accountNumber];

      client.query(query, values, (error, result) => {
        done();
        if (error || result.rows.length === 0) {
          response.status(404).json({
            status: statusCodes.notFound,
            error: 'Account number does not exist',
          });
          response.end();
        }

        const account = result.rows[0];
        const amountLeft = account.balance - amount;
        if (amountLeft < 0) { return response.status(400).json({ status: statusCodes.badRequest, error: 'Insufficients Funds' }); }

        const data = {
          createdOn: moment().format(),
          type: 'debit',
          accountNumber,
          cashier: id,
          amount,
          oldBalance: account.balance,
          newBalance: amountLeft,
        };

        const transactionQuery = `INSERT INTO transactions (
          createdOn,
          type,
          accountNumber,
          cashier,
          amount,
          oldBalance,
          newBalance
          ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const transactionValues = Object.values(data);

        client.query(transactionQuery, transactionValues, (transactionError, transactionResult) => {
          done();
          if (transactionError) {
            response.status(400).json({
              status: statusCodes.badRequest,
              error: transactionError.message,
            });
            response.end();
          }

          const transactionUser = transactionResult.rows[0];

          client.query('UPDATE accounts set balance=$1 where accountnumber=$2 RETURNING *', [data.newBalance, accountNumber], (updateError, updateResult) => {
            done();
            if (updateError) {
              response.status(400).json({
                status: statusCodes.badRequest,
                error: updateError.message,
              });
              response.end();
            }

            const { cashier, type, newbalance } = transactionUser;
            response.status(200).json({
              status: statusCodes.success,
              data: [{
                transactionId: transactionUser.id,
                accountNumber,
                amount: parseFloat(amount).toFixed(2),
                cashier,
                transactionType: type,
                accountBalance: parseFloat(newbalance).toFixed(2),
              }],
            });
            response.end();
          });
        });
      });
    });
  }
}

export default TransactionController;
