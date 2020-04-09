import dotenv from 'dotenv';

import { errorResponse, verifyToken } from '../../utils/helpers';
import models from '../../db/models';
const { User } = models;

dotenv.config();

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */
export async function checkAuthorizedUser(req, res, next) {
  try {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return errorResponse(res, 401, 'Please provide a JWT token');
    }
    req.user = await verifyToken(token, process.env.SECRET_KEY);
    if (!req.user) {
      return errorResponse(
        res,
        400,
        'Token is invalid, please provide a valid token',
      );
    }

    next();
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
}

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
export async function checkVerifedUser(req, res, next) {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user.isActive) {
    return errorResponse(res, 400, 'Enter the Code sent to you to continue');
  }
  next();
}
