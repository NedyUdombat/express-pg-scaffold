import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import { signupCredentials, loginDetails } from '../../db/mockdata/userdata';
import { generateToken } from '../../../utils/helpers';
chai.use(chaiHttp);
const { expect } = chai;

describe('Task completion', () => {
  context('Complete a task', () => {
    it('should select a new goal', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/goal/1/select')
        .set('x-access-token', await generateToken(signupCredentials));
      expect(res.status).to.equal(201);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('String');
      expect(res.body)
        .to.have.property('status')
        .to.eql('success');
      expect(res.body.message).to.eql('Successfully selected this goal');
    });

    it('should complete a task', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/task/1/')
        .set('x-access-token', await generateToken(signupCredentials));
      expect(res.status).to.equal(201);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('String');
      expect(res.body)
        .to.have.property('status')
        .to.eql('success');
      expect(res.body.message).to.eql('Successfully completed this task');
    });

    it('should set a task to incomplete', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/task/1/')
        .set('x-access-token', await generateToken(signupCredentials));
      expect(res.status).to.equal(201);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('String');
      expect(res.body)
        .to.have.property('status')
        .to.eql('success');
      expect(res.body.message).to.eql(
        'Successfully set this task to incomplete',
      );
    });
  });

  context('Get Tasks', () => {
    it('should return all tasks for the current loggedIn user', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/task')
        .set('x-access-token', await generateToken(signupCredentials));
      expect(res.status).to.equal(200);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('String');
      expect(res.body)
        .to.have.property('status')
        .to.eql('success');
      expect(res.body.message).to.eql(
        'All tasks successfully retrieved for this user',
      );
      expect(res.body)
        .to.have.property('data')
        .to.be.an('Object');
    });

    it('should return a single task', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/task/1')
        .set('x-access-token', await generateToken(signupCredentials));
      expect(res.status).to.equal(200);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('String');
      expect(res.body)
        .to.have.property('status')
        .to.eql('success');
      expect(res.body.message).to.eql('Successfully retrieved task');
      expect(res.body)
        .to.have.property('data')
        .to.be.an('Object');
      expect(res.body.data)
        .to.have.property('task')
        .to.be.an('Object');
      expect(res.body.data.task)
        .to.have.property('goal')
        .to.be.an('Object');
      expect(res.body.data.task)
        .to.have.property('tasks')
        .to.be.an('Array');
    });
  });
});
