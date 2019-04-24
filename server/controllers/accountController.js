/* eslint-disable no-shadow */
import moment from 'moment';
import utils from '../helpers/common';
import statusCodes from '../helpers/statusCodes';
import pool from '../models/database';
import { addAccount, updateAccountStatus, deleteAccount } from '../models/queries';

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
          response.status(400).json({
            status: statusCodes.badRequest,
            error: error.message,
          });
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
  }

  /**
   * change account status
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

    pool.connect((err, client, done) => {
      client.query(updateAccountStatus(status, accountNumber), (error, result) => {
        done();
        if (error || result.rows.length === 0) {
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

    pool.connect((err, client, done) => {
      client.query(deleteAccount(accountNumber), (error, result) => {
        done();
        if (error || result.rows.length === 0) {
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
  }
}

export default AccountController;
