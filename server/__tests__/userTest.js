import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../server';

const { SECRET } = process.env;

chai.use(chaiHttp);
const API_VERSION = '/api/v1';
const testUser = {
  id: 67,
  firstName: 'dele',
  lastName: 'bella',
  email: 'test@tester.com',
  password: 'password',
  confirmPassword: 'password',
};

const testAdmin = {
  id: 55,
  firstName: 'admins',
  lastName: 'admins',
  email: 'admins@gmail.com',
  password: 'password',
  confirmPassword: 'password',
  type: 'admin',
};

const jwtUser = {
  id: 67,
  firstName: 'dele',
  lastName: 'bella',
  email: 'test@tester.com',
  type: 'client',
  isAdmin: false,
};

const jwtAdmin = {
  id: 55,
  firstName: 'admins',
  lastName: 'admins',
  email: 'admins@gmail.com',
  type: 'staff',
  isAdmin: true,
};

const userToken = jwt.sign(jwtUser, SECRET, { expiresIn: '24h' });
const adminToken = jwt.sign(jwtAdmin, SECRET, { expiresIn: '24h' });

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    /**
       * Test the POST /auth/signup endpoint
       */
    const signupUrl = `${API_VERSION}/auth/signup`;
    it('should register a new user when all the parameters are given', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testUser)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('array');
          expect(response.body.data[0]).to.have.property('token');
          expect(response.body.data[0]).to.have.property('id');
          expect(response.body.data[0]).to.have.property('firstName');
          expect(response.body.data[0]).to.have.property('lastName');
          expect(response.body.data[0]).to.have.property('email');
          done();
        });
    });

    it('should not register a new user when the same email is used again', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testUser)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email already exists');
          done();
        });
    });

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'dele',
          lastName: 'bella',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'dele',
          username: 'bella',
          email: 'test@test.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('firstName is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'dele',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('lastName is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'dele',
          lastName: 'bella',
          username: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('password is required');
          done();
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'dele',
          lastName: 'bella',
          password: 'password',
          confirmPassword: 'pass',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('confirmPassword must match password');
          done();
        });
    });

    it('should not register a user when the email is not valid', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'dele',
          lastName: 'bella',
          email: 'testtest.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('email must be a valid email');
          done();
        });
    });
  });

  describe('Testing signin controller', () => {
    /**
       * Test the POST /auth/signin endpoint
       */
    const signinUrl = `${API_VERSION}/auth/signin`;
    it('should login a new user when all the parameters are given', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.be.a('array');
          expect(response.body.data[0]).to.have.property('token');
          expect(response.body.data[0]).to.have.property('id');
          expect(response.body.data[0]).to.have.property('firstName');
          expect(response.body.data[0]).to.have.property('lastName');
          expect(response.body.data[0]).to.have.property('email');
          expect(response.body.data[0].email).to.equal(testUser.email);
          done();
        });
    });

    it('should not login a user when the email is missing', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('email is required');
          done();
        });
    });

    it('should not login a user when the password is missing', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'dele@gmail.com',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('password is required');
          done();
        });
    });


    it('should not login a user when the email does not exist', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'wrongemail@gmail.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid login details, email or password is wrong');
          done();
        });
    });

    it('should not login a user when the email is invalid', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'wrongemailgmailcom',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('email must be a valid email');
          done();
        });
    });

    it('should not login a user when the password is wrong', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'mike@gmail.com',
          password: 'wrong password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid login details, email or password is wrong');
          done();
        });
    });
  });

  describe('Testing user accounts controller', () => {
    /**
       * Test the GET /user/:userEmail/accounts endpoint
       */
    let userEmail = 'jamesbond@gmail.com';
    const accountUrl = `${API_VERSION}/user/${userEmail}/accounts`;
    it('should view a user\'s accounts when all the parameters are given', (done) => {
      chai.request(app)
        .get(accountUrl)
        .set('Authorization', userToken)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body.data).to.be.a('array');
          done();
        });
    });

    it('should not view a user\'s accounts when the email does not exist', (done) => {
      userEmail = 'brucelee@gmail.com';
      chai.request(app)
        .get(`${API_VERSION}/user/${userEmail}/accounts`)
        .set('Authorization', userToken)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(404);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('User does not exist');
          done();
        });
    });

    it('should not view a user\'s accounts when the email owner does not have an account', (done) => {
      userEmail = 'test@tester.com';
      chai.request(app)
        .get(`${API_VERSION}/user/${userEmail}/accounts`)
        .set('Authorization', userToken)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(404);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('User has no account created');
          done();
        });
    });
  });

  describe('Testing admin create user account controller', () => {
    /**
       * Test the POST /user/admin endpoint
       */
    const signupUrl = `${API_VERSION}/user/admin`;
    it('should register a new user account when all the parameters are given', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send(testAdmin)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('array');
          expect(response.body.data[0]).to.have.property('token');
          expect(response.body.data[0]).to.have.property('id');
          expect(response.body.data[0]).to.have.property('firstName');
          expect(response.body.data[0]).to.have.property('lastName');
          expect(response.body.data[0]).to.have.property('email');
          done();
        });
    });

    it('should not register a new user having wrong permission', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', userToken)
        .send(testAdmin)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          done();
        });
    });

    it('should not register a new user when the same email is used again', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send(testAdmin)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email already exists');
          done();
        });
    });

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send({
          firstName: 'dele',
          lastName: 'bella',
          password: 'password',
          confirmPassword: 'password',
          type: 'staff',
          isAdmin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send({
          lastName: 'dele',
          username: 'bella',
          email: 'testadmin@test.com',
          password: 'password',
          confirmPassword: 'password',
          type: 'staff',
          isAdmin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('firstName is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send({
          firstName: 'dele',
          password: 'password',
          confirmPassword: 'password',
          type: 'staff',
          isAdmin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('lastName is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send({
          email: 'test@test.com',
          firstName: 'dele',
          lastName: 'bella',
          username: 'password',
          confirmPassword: 'password',
          type: 'staff',
          isAdmin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('password is required');
          done();
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send({
          email: 'test@test.com',
          firstName: 'dele',
          lastName: 'bella',
          password: 'password',
          confirmPassword: 'pass',
          type: 'staff',
          isAdmin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('confirmPassword must match password');
          done();
        });
    });

    it('should not register a user when the email is not valid', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Authorization', adminToken)
        .send({
          firstName: 'dele',
          lastName: 'bella',
          email: 'testtest.com',
          password: 'password',
          confirmPassword: 'password',
          type: 'staff',
          isAdmin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('email must be a valid email');
          done();
        });
    });
  });
});
