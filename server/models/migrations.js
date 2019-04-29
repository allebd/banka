import Debug from 'debug';
import moment from 'moment';
import pool from './database';
import utils from '../helpers/common';
import { addAccount, addUser } from './queries';

const debug = Debug('http');
const adminData = {
  email: 'delebella@gmail.com',
  firstName: 'Dele',
  lastName: 'Bella',
  password: utils.hashPassword('password'),
  registered: moment().format(),
  type: 'staff',
  isAdmin: true,
};

const clientData = {
  email: 'jamesbond@gmail.com',
  firstName: 'James',
  lastName: 'Bond',
  password: utils.hashPassword('password'),
  registered: moment().format(),
  type: 'client',
  isAdmin: false,
};

const accountData = {
  accountNumber: '2039939293',
  createdOn: moment().format(),
  owner: 2,
  type: 'savings',
  status: 'draft',
  balance: 0.00,
};

const accountData2 = {
  accountNumber: '2559939393',
  createdOn: moment().format(),
  owner: 2,
  type: 'savings',
  status: 'draft',
  balance: 0.00,
};

/**
 * Create Tables
 */
const createTables = () => {
  const users = `CREATE TABLE IF NOT EXISTS
    users (
        id SERIAL PRIMARY KEY,      
        email VARCHAR(128) UNIQUE NOT NULL,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        registered TIMESTAMP,
        type VARCHAR(128) NOT NULL,
        isAdmin BOOLEAN
    )`;

  const accounts = `CREATE TABLE IF NOT EXISTS
    accounts (
        id SERIAL PRIMARY KEY,
        accountNumber BIGINT UNIQUE NOT NULL,
        createdOn TIMESTAMP,
        owner INT NOT NULL,
        type VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        balance float8
    )`;

  const transactions = `CREATE TABLE IF NOT EXISTS
  transactions (
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP,
        type VARCHAR(128) NOT NULL,
        accountNumber BIGINT NOT NULL,
        cashier INT NOT NULL,
        amount float8,
        oldBalance float8,
        newBalance float8
    )`;

  pool.query(users)
    .then((response) => {
      debug(response);
      pool.end();
    })
    .catch((error) => {
      debug(error);
      pool.end();
    });

  pool.query(accounts)
    .then((response) => {
      debug(response);
      pool.end();
    })
    .catch((error) => {
      debug(error);
      pool.end();
    });

  pool.query(transactions)
    .then((response) => {
      debug(response);
      pool.end();
    })
    .catch((error) => {
      debug(error);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS users, accounts, transactions')
    .then(() => {
      debug('Table dropped');
    });
};

const createAdmin = () => {
  pool.query(addUser(adminData), (error, result) => {
    if (error) {
      debug(error);
    }
    debug(result);
  });
};

const createClient = () => {
  pool.query(addUser(clientData), (error, result) => {
    if (error) {
      debug(error);
    }
    debug(result);
  });
};

const createAccount = () => {
  pool.query(addAccount(accountData), (error, result) => {
    if (error) {
      debug(error);
    }
    debug(result);
  });
};

const createAccount2 = () => {
  pool.query(addAccount(accountData2), (error, result) => {
    if (error) {
      debug(error);
    }
    debug(result);
  });
};

pool.on('remove', () => {
  debug('client removed');
  process.exit(0);
});

module.exports = {
  dropTables,
  createTables,
  createAdmin,
  createClient,
  createAccount,
  createAccount2,
};

require('make-runnable');
