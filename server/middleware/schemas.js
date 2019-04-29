import Joi from 'joi';

const name = Joi.string().min(4).required();
const email = Joi.string().min(4).email({ minDomainSegments: 2 }).required();
const password = Joi.string().min(4).lowercase().required();
const confirmPassword = Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } });
const accountNumber = Joi.string().regex(/^\d+$/).required();

export const createUserSchema = (data) => {
  const schema = {
    firstName: name,
    lastName: name,
    email,
    password,
    confirmPassword,
  };

  return Joi.validate(data, schema);
};

export const createAdminSchema = (data) => {
  const schema = {
    firstName: name,
    lastName: name,
    email,
    password,
    confirmPassword,
    type: Joi.string().lowercase().valid('staff', 'admin').required(),
  };

  return Joi.validate(data, schema);
};

export const loginUserSchema = (data) => {
  const schema = {
    email,
    password,
  };

  return Joi.validate(data, schema);
};

export const createAccountSchema = (data) => {
  const schema = {
    type: Joi.string().lowercase().valid('savings', 'current').required(),
  };

  return Joi.validate(data, schema);
};

export const changeStatusSchema = (data) => {
  const schema = {
    accountNumber: accountNumber.error(new Error('Account number must be an integer')),
    status: Joi.string().lowercase().valid('activate', 'deactivate').required(),
  };

  return Joi.validate(data, schema);
};

export const transactionSchema = (data) => {
  const schema = {
    accountNumber: accountNumber.error(new Error('Account number must be an integer')),
    amount: Joi.number().positive().precision(2).required(),
  };

  return Joi.validate(data, schema);
};

export const accountNumberSchema = (data) => {
  const schema = {
    accountNumber: accountNumber.error(new Error('Account number must be an integer')),
  };

  return Joi.validate(data, schema);
};

export const emailSchema = (data) => {
  const schema = {
    email: Joi.string().min(4).email({ minDomainSegments: 2 }),
  };

  return Joi.validate(data, schema);
};

export const transactionIdSchema = (data) => {
  const schema = {
    transactionId: accountNumber.error(new Error('Transaction Id must be an integer')),
  };

  return Joi.validate(data, schema);
};
