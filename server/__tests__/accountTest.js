import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../server';

const { SECRET } = process.env;

chai.use(chaiHttp);

const API_VERSION = '/api/v1';
const testUser = {
  id: 89,
  firstName: 'dele',
  lastName: 'bella',
  email: 'test@test.com',
  password: 'password',
  confirmPassword: 'password',
};
const accountUser = {
  type: 'savings',
};

const userToken = jwt.sign(testUser, SECRET, { expiresIn: '24h' });

describe('Testing Accounts Controller', () => {
  /**
     * Sign in user to generate user token before test
     */
  before('account operations can begin when user have signed up', (done) => {
    chai.request(app)
      .post(`${API_VERSION}/auth/signup`)
      .send(testUser)
      .end((error, response) => {
        expect(response.body.status).to.equal(201);
        done();
      });
  });

  describe('Testing create account controller', () => {
    /**
       * Test the POST /accounts endpoint
       */
    const accountUrl = `${API_VERSION}/accounts`;

    it('should not create account when authorization is undefined', (done) => {
      chai.request(app)
        .post(accountUrl)
        .send({})
        .end((error, response) => {
          // eslint-disable-next-line no-unused-expressions
          expect(response.headers.authorization).to.be.undefined;
          done();
        });
    });

    it('should not create account when authorization token is invalid', (done) => {
      chai.request(app)
        .post(accountUrl)
        .set('Authorization', '555555')
        .send(accountUser)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.equal('Invalid token!');
          done();
        });
    });

    it('should create a new account when all the parameters are given', (done) => {
      chai.request(app)
        .post(accountUrl)
        .set('Authorization', userToken)
        .send(accountUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('type');
          expect(response.body.data).to.have.property('openingBalance');
          done();
        });
    });

    it('should not create an account when the account type is missing', (done) => {
      chai.request(app)
        .post(accountUrl)
        .set('Authorization', userToken)
        .send({
          type: '',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('No account type selected');
          done();
        });
    });

    it('should not create an account when the account type is not savings or current', (done) => {
      chai.request(app)
        .post(accountUrl)
        .send({
          type: 'anothertype',
        })
        .set('Authorization', userToken)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account Type must be either savings or current');
          done();
        });
    });
  });

  /**
     * Test the PATCH /accounts/:accountNumber endpoint
     */
  describe('Change of status by activating or deactivating the accounts of account holders', () => {
    let accountNumber = 2039939293;
    let accountbody = { status: 'activate' };

    it('should activate a user bank account', (done) => {
      chai.request(app)
        .patch(`${API_VERSION}/account/${accountNumber}`)
        .set('Authorization', userToken)
        .send(accountbody)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data.accountNumber).to.equal(accountNumber);
          expect(response.body.data.status).to.equal(accountbody.status);
          done();
        });
    });

    it('should deactivate a user bank account', (done) => {
      accountbody = { status: 'deactivate' };
      chai.request(app)
        .patch(`${API_VERSION}/account/${accountNumber}`)
        .set('Authorization', userToken)
        .send(accountbody)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data.accountNumber).to.equal(accountNumber);
          expect(response.body.data.status).to.equal(accountbody.status);
          done();
        });
    });

    it('should not change status when account number is wrong or does not exist', (done) => {
      accountNumber = 2220108723333;
      chai.request(app)
        .patch(`${API_VERSION}/account/${accountNumber}`)
        .set('Authorization', userToken)
        .send(accountbody)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(404);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account number does not exist');
          done();
        });
    });

    it('should not change status when the wrong request is sent', (done) => {
      accountbody = { status: 'validate' };
      chai.request(app)
        .patch(`${API_VERSION}/account/${accountNumber}`)
        .set('Authorization', userToken)
        .send(accountbody)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid request sent');
          done();
        });
    });

    it('should not have an empty status selected', (done) => {
      accountbody = { status: '' };
      chai.request(app)
        .patch(`${API_VERSION}/account/${accountNumber}`)
        .set('Authorization', userToken)
        .send(accountbody)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('No request sent');
          done();
        });
    });
  });

  /**
     * Test the DELETE /accounts/:accountNumber endpoint
     */
  describe('Delete account of account holders', () => {
    let accountNumber = 2039939293;

    it('should delete a user bank account', (done) => {
      chai.request(app)
        .delete(`${API_VERSION}/accounts/${accountNumber}`)
        .set('Authorization', userToken)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body).to.have.property('message');
          done();
        });
    });

    it('should not delete account when account number is wrong or does not exist', (done) => {
      accountNumber = 2220108723333;
      chai.request(app)
        .delete(`${API_VERSION}/accounts/${accountNumber}`)
        .set('Authorization', userToken)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(404);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account number does not exist');
          done();
        });
    });
  });
});
