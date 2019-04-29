# Banka

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.

[![Build Status](https://travis-ci.org/allebd/banka.svg?branch=develop)](https://travis-ci.org/allebd/banka) [![Coverage Status](https://coveralls.io/repos/github/allebd/banka/badge.svg?branch=develop)](https://coveralls.io/github/allebd/banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/633cf1e27f31ec002c9a/maintainability)](https://codeclimate.com/github/allebd/banka/maintainability)

## Table of Contents

* [About](#banka)
* [Required Features](#required-features)
* [Optional Features](#optional-features)
* [UI Templates](#ui-templates)
* [Pivotal Tracker](#pivotal-tracker)
* [Heroku Deployment](#heroku-deployment)
* [Swagger Documentation](#swagger-documentation)
* [Technologies Used](#technologies-used)
* [Acknowledgements](#acknowledgements)
* [Author](#author)

## Required Features

* User (client) can sign up.
* User (client) can login.
* User (client) can create an account.
* User (client) can view account transaction history.
* User (client) can view a specific account transaction.
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.

## Optional Features

* User can reset password.
* Integrate real time email notification upon credit/debit transaction on user account.
* User can upload a photo to their profile.

## UI Templates

UI Template for the application can be found here [Github pages](https://allebd.github.io/banka/UI/index.html)

## Pivotal Tracker

Pivotal Tracker Stories can found here [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2320160)

## Heroku Deployment

Application was deployed to Heroku. Use public URL [https://banka-allebd.herokuapp.com](https://banka-allebd.herokuapp.com) with API endpoints.

## Swagger Documentation

API Documention was generated with [Swagger](https://banka-allebd.herokuapp.com/api-docs).

## Technologies Used

* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) for frontend design
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) for styling frontend
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for frontend design
* [Node-js](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
* [PostgreSQL](https://www.postgresql.org/) used for setting up relational database
* [Babel](https://babeljs.io/) used for transpiling codes from ES6 to ES5
* [Mocha](https://mochajs.org/) used for setting up tests

## Installations

### Getting started

* You need to have Node and NPM installed on your computer.
* Installing [Node](node) automatically comes with npm.

### Clone

* Clone this project to your local machine `https://github.com/allebd/Banka.git`

### Setup

* Installing the project dependencies
  > Run the command below

```shell
   npm install
```

* Start your node server
  > run the command below

```shell
  npm start
```

* Use `http://localhost:5000` as base url for endpoints

### Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS
| ------ | --------------------------------------- | -------------------------
| POST   | Sign up for an account                  | `/api/v1/auth/signup`
| POST   | Sign in to an account                   | `/api/v1/auth/signin`
| POST   | Create a bank account                   | `/api/v1/accounts`
| GET    | Get all accounts                        | `/api/v1/accounts`
| GET    | Get a specific account                  | `/api/v1/accounts/:accountNumber`
| PATCH | Activate or deactivate an account          | `/api/v1/account/:accountNumber`
| DELETE   | Delete an account                     | `/api/v1/accounts/:accountNumber`
| POST     | Perform a debit transaction           | `/api/v1/transactions/{accountNumber}/debit`
| POST     | Perform a credit transaction          | `/api/v1/transactions/{accountNumber}/credit`
| GET    | Get all account's transactions            | `/api/v1/accounts/{accountNumber}/transactions`
| GET    | Get specific transaction                | `/api/v1/transactions/{id}`
| GET | Get all dormant account         | `/api/v1/accounts?status=active`
| GET   | Get all active account                 | `/api/v1/accounts?status=dormant`
| GET     | Get all accounts owned by a specific user          | `/api/v1/user/:userEmail/accounts`
| POST    | Create staff/admin account            | `/api/v1/user/admin`
| GET    | Get API Documentation                | `/api-docs`

### Running Unit Test

* Run test for all endpoints
  > run the command below
  
```shell
  npm test
```

## Acknowledgements

* [Andela](https://andela.com/)
* [Icons8](https://icons8.com/)

## Author

[Bella Oyedele](https://github.com/allebd)
