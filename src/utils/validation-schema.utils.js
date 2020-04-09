import Joi from 'joi';

/**
 * This is the schema definition
 * for a Article.
 */
export const userSchema = Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .lowercase()
      .trim()
      .min(3)
      .required(),
    email: Joi.string()
      .lowercase()
      .trim()
      .email({
        minDomainAtoms: 2,
      })
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .required(),
  })
  .options({ stripUnknown: true });

export const userOtp = Joi.object()
  .keys({
    code: Joi.string()
      .alphanum()
      .min(6)
      .max(6)
      .required(),
  })
  .options({ stripUnknown: true });

export const regUserSchema = Joi.object().keys({
  email: Joi.string()
    .lowercase()
    .trim()
    .email({
      minDomainAtoms: 2,
    })
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .required(),
});

export const userDetail = Joi.object().keys({
  dob: Joi.date()
    .required()
    .iso(),
  gender: Joi.string()
    .alphanum()
    .required()
    .trim(),
});

export const userInterests = Joi.object().keys({
  interests: Joi.array()
    .items(Joi.number().required())
    .required(),
});
