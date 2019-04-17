export default {
  users: [
    {
      id: 1,
      email: 'delebella@gmail.com',
      firstName: 'Dele',
      lastName: 'Bella',
      password: 'delebella',
      type: 'staff',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'josephfisher@gmail.com',
      firstName: 'Joseph',
      lastName: 'Fisher',
      password: 'josephfisher',
      type: 'staff',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'jamesbond@gmail.com',
      firstName: 'James',
      lastName: 'Bond',
      password: 'jamesbond',
      type: 'client',
      isAdmin: false,
    },
    {
      id: 4,
      email: 'ifeanyiuba@gmail.com',
      firstName: 'Ifeanyi',
      lastName: 'Uba',
      password: 'ifeanyiuba',
      type: 'client',
      isAdmin: false,
    },
  ],
  account: [
    {
      id: 1,
      accountNumber: 2039939293,
      createdOn: '2019-23-20 09:23:23',
      owner: 3,
      type: 'current',
      status: 'draft',
      balance: '0.00',
    },
    {
      id: 2,
      accountNumber: 2039956593,
      createdOn: '2019-23-20 09:23:23',
      owner: 4,
      type: 'current',
      status: 'dormant',
      balance: '20.00',
    },
    {
      id: 3,
      accountNumber: 2039956566,
      createdOn: '2019-23-20 09:23:23',
      owner: 3,
      type: 'savings',
      status: 'active',
      balance: '3000.00',
    },
  ],
  transaction: [
    {
      id: 1,
      createdOn: '2019-23-20 09:23:23',
      type: 'credit',
      accountNumber: 2039956566,
      cashier: 2,
      amount: 1000.00,
      oldBalance: 1000.00,
      newBalance: 2000.00,
    },
    {
      id: 2,
      createdOn: '2019-23-20 09:23:23',
      type: 'debit',
      accountNumber: 2039956566,
      cashier: 2,
      amount: 50.00,
      oldBalance: 2000.00,
      newBalance: 1950.00,
    },
    {
      id: 3,
      createdOn: '2019-23-20 09:23:23',
      type: 'credit',
      accountNumber: 2039956566,
      cashier: 2,
      amount: 1050.00,
      oldBalance: 1950.00,
      newBalance: 3000.00,
    },
  ],
};