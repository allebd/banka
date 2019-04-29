import statusCodes from '../helpers/statusCodes';
import {
  createUserSchema,
  createAdminSchema,
  loginUserSchema,
  createAccountSchema,
  changeStatusSchema,
  accountNumberSchema,
  transactionSchema,
  transactionIdSchema,
  emailSchema,
} from './schemas';

export const validateSignup = (request, response, next) => {
  try {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = request.body;

    const userDetails = {
      firstName, lastName, email, password, confirmPassword,
    };
    const result = createUserSchema(userDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateNewAdmin = (request, response, next) => {
  try {
    const {
      firstName, lastName, email, password, confirmPassword, type,
    } = request.body;

    const userDetails = {
      firstName, lastName, email, password, confirmPassword, type,
    };
    const result = createAdminSchema(userDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateSignin = (request, response, next) => {
  try {
    const { email, password } = request.body;

    const userDetails = {
      email, password,
    };
    const result = loginUserSchema(userDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateCreate = (request, response, next) => {
  try {
    const { type } = request.body;

    const userAccount = { type };

    const result = createAccountSchema(userAccount);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateEmail = (request, response, next) => {
  try {
    const {
      email,
    } = request.params;

    const userDetails = {
      email,
    };
    const result = emailSchema(userDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateStatusChange = (request, response, next) => {
  try {
    const { status } = request.body;
    const { accountNumber } = request.params;

    const statusDetails = {
      accountNumber, status,
    };
    const result = changeStatusSchema(statusDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateAmount = (request, response, next) => {
  try {
    const { amount } = request.body;
    const { accountNumber } = request.params;

    const amountDetails = {
      accountNumber, amount,
    };
    const result = transactionSchema(amountDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateAccountNumber = (request, response, next) => {
  try {
    const { accountNumber } = request.params;

    const accountDetails = {
      accountNumber,
    };
    const result = accountNumberSchema(accountDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};

export const validateTransaction = (request, response, next) => {
  try {
    const { transactionId } = request.params;

    const transactionDetails = {
      transactionId,
    };
    const result = transactionIdSchema(transactionDetails);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return response.status(400).json({
        status: statusCodes.badRequest,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    next();
  } catch (e) {
    return response.status(400).json({
      status: statusCodes.badRequest,
      error: 'Missing required parameters',
    });
  }
};
