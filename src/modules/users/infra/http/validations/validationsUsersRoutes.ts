import { celebrate, Joi, Segments } from 'celebrate';

const postUserValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    birthday: Joi.date().required(),
    telephone: Joi.string().trim().required(),
    user_type: Joi.string().valid('personal', 'nutritionist', 'student'),
    cref_crn: Joi.when('user_type', [
      {
        is: 'personal',
        then: Joi.number().required(),
      },
      {
        is: 'nutritionist',
        then: Joi.number().required(),
      },
    ]),
    street: Joi.string().trim().required(),
    number: Joi.number().required(),
    district: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    uf: Joi.string().trim().length(2).required(),
    cep: Joi.string().trim().required(),
  },
});

const postSessionValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export { postSessionValidation, postUserValidation };
