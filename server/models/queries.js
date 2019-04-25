/**
 * @name addAccount
 * @description - adds a new account
 * @param {object} data
 * @returns the object query
 */

export const addAccount = data => ({
  text: `INSERT INTO accounts (
    accountNumber,
    createdOn,
    owner,
    type,
    status,
    balance
  ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  values: [data.accountNumber, data.createdOn, data.owner, data.type, data.status, data.balance],
});

/**
 * @name updateAccountStatus
 * @description - updates account status
 * @param {string} status
 * @param {int} accountNumber
 * @returns the object query
 */

export const updateAccountStatus = (status, accountNumber) => ({
  text: 'UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING id, status',
  values: [status, accountNumber],
});

/**
 * @name DeleteAccount
 * @description - deletes an account
 * @param {int} accountNumber
 * @returns the query
 */

export const deleteAccount = accountNumber => ({
  text: 'DELETE FROM accounts WHERE accountnumber = $1 RETURNING id, status',
  values: [accountNumber],
});

/**
 * @name getAccountByNumber
 * @description - gets a single account
 * @param {int} accountNumber
 * @returns the query
 */

export const getAccountByNumber = accountNumber => ({
  text: 'SELECT * FROM accounts WHERE accountnumber = $1',
  values: [accountNumber],
});

/**
 * @name getAccounts
 * @description - gets all account
 * @returns the query
 */

export const getAccounts = () => ({
  text: 'SELECT a.createdon AS createdOn, a.accountnumber AS accountNumber, u.email AS ownerEmail, a.type AS type, a.status AS status , a.balance AS balance FROM accounts a INNER JOIN users u ON u.id = a.owner',
  values: [],
});

/**
 * @name getAccountByStatus
 * @description - gets all dormant account
 * @param {string} status
 * @returns the query
 */

export const getAccountByStatus = status => ({
  text: 'SELECT a.createdon AS createdOn, a.accountnumber AS accountNumber, u.email AS ownerEmail, a.type AS type, a.status AS status , a.balance AS balance FROM accounts a INNER JOIN users u ON u.id = a.owner WHERE status = $i',
  values: [status],
});

/**
 * @name getAccountByOwnerId
 * @description - gets all owner account
 * @param {int} ownerId
 * @returns the query
 */

export const getAccountByOwnerId = ownerId => ({
  text: 'SELECT createdon, accountnumber, type, status, balance FROM accounts WHERE owner = $1',
  values: [ownerId],
});

/**
 * @name addTransaction
 * @description - adds a new transaction
 * @param {object} data
 * @returns the object query
 */

export const addTransaction = data => ({
  text: `INSERT INTO transactions (
        createdOn,
        type,
        accountNumber,
        cashier,
        amount,
        oldBalance,
        newBalance
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  values: [
    data.createdOn,
    data.type,
    data.accountNumber,
    data.cashier,
    data.amount,
    data.oldBalance,
    data.newBalance],
});

/**
 * @name updateAccountBalance
 * @description - updates account balance
 * @param {string} balance
 * @param {int} accountNumber
 * @returns the object query
 */

export const updateAccountBalance = (balance, accountNumber) => ({
  text: 'UPDATE accounts set balance=$1 WHERE accountnumber=$2 RETURNING *',
  values: [balance, accountNumber],
});

/**
 * @name addUser
 * @description - adds a new user
 * @param {object} data
 * @returns the object query
 */

export const addUser = data => ({
  text: `INSERT INTO users (
        email,
        firstName,
        lastName,
        password,
        registered,
        type,
        isAdmin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  values: [
    data.email,
    data.firstName,
    data.lastName,
    data.password,
    data.registered,
    data.type,
    data.isAdmin],
});

/**
 * @name getUserByEmail
 * @description - gets a single user
 * @param {string} email
 * @returns the query
 */

export const getUserByEmail = email => ({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email],
});

/**
 * @name getUserById
 * @description - gets a single user
 * @param {int} id
 * @returns the query
 */

export const getUserById = userId => ({
  text: 'SELECT * FROM users WHERE id = $1',
  values: [userId],
});

/**
 * @name getAccountTransactions
 * @description - gets a single account Transactions
 * @param {int} accountNumber
 * @returns the query
 */

export const getAccountTransactions = accountNumber => ({
  text: 'SELECT id AS transactionId, createdon AS createdOn, type, accountnumber AS accountNumber, oldbalance AS oldBalance, newbalance AS newBalance FROM transactions WHERE accountnumber = $1',
  values: [accountNumber],
});

/**
 * @name getTransaction
 * @description - gets a single Transaction
 * @param {int} transactionId
 * @returns the query
 */

export const getTransaction = transactionId => ({
  text: 'SELECT * FROM transactions WHERE id = $1',
  values: [transactionId],
});
