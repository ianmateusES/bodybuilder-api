import { celebrate, Joi, Segments } from 'celebrate';

const idValidation = {
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
};

const postPersonalValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    birthday: Joi.date().required(),
    telephone: Joi.string().trim().required(),
    cref: Joi.string().trim().required(),
    street: Joi.string().trim().required(),
    number: Joi.number().required(),
    district: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    uf: Joi.string().trim().length(2).required(),
    cep: Joi.string().trim().required(),
  },
});

const putPersonalValidation = celebrate({
  ...idValidation,
  [Segments.BODY]: {
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string().allow(''),
    password: Joi.when('old_password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
    password_confirmation: Joi.when('password', {
      is: Joi.exist(),
      then: Joi.valid(Joi.ref('password')).required(),
    }),
    birthday: Joi.date().required(),
    telephone: Joi.string().trim().required(),
    cref: Joi.string().trim().required(),
    street: Joi.string().trim().required(),
    number: Joi.number().required(),
    district: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    uf: Joi.string().trim().length(2).required(),
    cep: Joi.string().trim().required(),
  },
});

const deletePersonalValidation = celebrate({
  ...idValidation,
});

export {
  postPersonalValidation,
  putPersonalValidation,
  deletePersonalValidation,
};
