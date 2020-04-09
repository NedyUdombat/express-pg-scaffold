import validator from '../../utils/validator.utils';
import {
  userSchema,
  userOtp,
  regUserSchema,
  userDetail,
  userInterests,
} from '../../utils/validation-schema.utils';
import { validate } from 'joi';

/**
 * Input validator for a new user account
 * @param {Object} req - request body
 * @param {Object} res - response object
 * @param {Object} next - pass control to the next handler
 * @returns {Object} Validator helper function
 */
export const validateNewUser = (req, res, next) => {
  validator(req.body, userSchema, res, next);
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {Object} Validator helper function
 */
export const validateVerifyToken = (req, res, next) => {
  validator(req.body, userOtp, res, next);
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {Object} Validator helper function
 */
export const validateReturningUser = (req, res, next) => {
  validator(req.body, regUserSchema, res, next);
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {Object} Validator helper function
 */
export const validateUpdateUser = (req, res, next) => {
  validator(req.body, userDetail, res, next);
};

export const validateUserInterests = (req, res, next) => {
  validator(req.body, userInterests, res, next);
};
