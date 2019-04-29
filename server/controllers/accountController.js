import moment from 'moment';
import utils from '../helpers/common';
import statusCodes from '../helpers/statusCodes';
import pool from '../models/database';
import {
  addAccount,
  updateAccountStatus,
  deleteAccount,
  getAccountByNumber,
  getAccountTransactions,
  getUserById,
  getAccounts,
  getAccountByStatus,
} from '../models/queries';

/**
 * @class AccountController
 */
class AccountController {
  /**
   * create new account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */

  static createAccount(request, response) {
    try {
      const { type } = request.body;
      const {
        id, firstName, lastName, email,
      } = request.decode;

      const data = {
        accountNumber: utils.generateAccountNumber(),
        createdOn: moment().format(),
        owner: id,
        type,
        status: 'draft',
        balance: 0.00,
      };

      pool.connect((err, client, done) => {
        client.query(addAccount(data), (error, result) => {
          done();
          if (error) {
            if (error.code === '23505') {
              response.status(400).json({
                status: statusCodes.badRequest,
                error: 'Account number generated already exists, try again.',
              });
            }
          }
          const account = result.rows[0];
          const {
            accountnumber,
            type,
            balance,
          } = account;

          return response.status(201).json({
            status: statusCodes.created,
            data: [{
              accountNumber: accountnumber,
              firstName,
              lastName,
              email,
              type,
              openingBalance: balance,
            }],
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * change account status
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  static changeAccountStatus(request, response) {
    try {
      let { status } = request.body;
      const { accountNumber } = request.params;

      if (status === 'activate') {
        status = 'active';
      } else {
        status = 'dormant';
      }

      pool.connect((err, client, done) => {
        client.query(updateAccountStatus(status, accountNumber), (error, result) => {
          done();
          if (result.rows.length === 0) {
            return response.status(404).json({
              status: statusCodes.notFound,
              error: 'Account number does not exist',
            });
          }

          return response.status(200).json({
            status: statusCodes.success,
            data: [{
              accountNumber,
              status,
            }],
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * Delete account
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  static deleteAccount(request, response) {
    try {
      const { accountNumber } = request.params;

      pool.connect((err, client, done) => {
        client.query(deleteAccount(accountNumber), (error, result) => {
          done();
          if (result.rows.length === 0) {
            return response.status(404).json({
              status: statusCodes.notFound,
              error: 'Account number does not exist',
            });
          }

          return response.status(200).json({
            status: statusCodes.success,
            data: [{ message: 'Account successfully deleted' }],
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * Account Transactions
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  static accountTransactions(request, response) {
    try {
      const { accountNumber } = request.params;

      pool.connect((err, client, done) => {
        client.query(getAccountByNumber(accountNumber), (error, result) => {
          done();
          if (result.rows.length === 0) {
            return response.status(404).json({
              status: statusCodes.notFound,
              error: 'Account number does not exist',
            });
          }

          client.query(getAccountTransactions(accountNumber), (transactError, transactResult) => {
            done();
            return response.status(200).json({
              status: statusCodes.success,
              data: transactResult.rows,
            });
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * Check account number details
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  static checkAccountNumber(request, response) {
    try {
      const { accountNumber } = request.params;

      pool.connect((err, client, done) => {
        client.query(getAccountByNumber(accountNumber), (error, result) => {
          done();
          if (result.rows.length === 0) {
            return response.status(404).json({
              status: statusCodes.notFound,
              error: 'Account number does not exist',
            });
          }

          const accountDetails = result.rows[0];
          const {
            createdon, accountnumber, owner, type, status, balance,
          } = accountDetails;
          const user = getUserById(owner);

          return response.status(200).json({
            status: statusCodes.success,
            data: [{
              createdOn: createdon,
              accountNumber: accountnumber,
              ownerEmail: user.email,
              type,
              status,
              balance,
            }],
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }

  /**
   * Check accounts
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  static checkAccounts(request, response) {
    try {
      const { status } = request.query;

      if (status) {
        pool.connect((err, client, done) => {
          client.query(getAccountByStatus(), (error, result) => {
            done();
            if (result.rows.length === 0) {
              return response.status(404).json({
                status: statusCodes.notFound,
                error: 'No record exist',
              });
            }

            const accountDetails = result.rows;

            return response.status(200).json({
              status: statusCodes.success,
              data: accountDetails,
            });
          });
        });
      }
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }

    try {
      pool.connect((err, client, done) => {
        client.query(getAccounts(), (error, result) => {
          done();

          const accountDetails = result.rows;

          return response.status(200).json({
            status: statusCodes.success,
            data: accountDetails,
          });
        });
      });
    } catch (e) {
      return response.status(500).json({ status: statusCodes.serverError, error: 'Server Error' });
    }
  }
}

export default AccountController;
