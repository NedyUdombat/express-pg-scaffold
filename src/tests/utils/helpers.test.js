import chai from 'chai';
import chaiHttp from 'chai-http';

import {
  generateToken,
  hashPassword,
  comparePassword,
  verifyToken,
} from '../../utils/helpers';

chai.use(chaiHttp);
const { expect } = chai;

let hashedPassword;

describe('HELPERS MODULE', () => {
  context('Token', () => {
    let result;
    it('should generate a token', async () => {
      result = await generateToken({ id: 22 });
      expect(result).to.be.a('String');
    });

    it('should verify a token', async () => {
      const verifiedToken = await verifyToken(result);
      expect(verifiedToken).to.be.an('Object');
    });

    it('should throw an error if token verification is not valid', async () => {
      const failedTokenResult = await verifyToken(
        'gsdvcbhc.acwudsbvbwdbufjc2w3dqwf2we',
      );
      expect(failedTokenResult).to.eql(null);
    });
  });

  context('Password Hashing', () => {
    it('should hash password successfully', async () => {
      try {
        hashedPassword = await hashPassword('password');
        expect(hashedPassword).to.be.an('string');
        expect(hashedPassword.length).to.be.gt(30);
      } catch (error) {
        throw error;
      }
    });
  });

  context('Password Comparison', () => {
    it('should compare password successfully', async () => {
      try {
        const isMatch = await comparePassword(hashedPassword, 'password');
        expect(isMatch).to.eql(true);
      } catch (error) {
        throw error;
      }
    });

    it('should compare password unsuccessfully', async () => {
      try {
        const isMatch = await comparePassword(hashedPassword, 'assword');
        expect(isMatch).to.eql(false);
      } catch (error) {
        throw error;
      }
    });
  });
});
