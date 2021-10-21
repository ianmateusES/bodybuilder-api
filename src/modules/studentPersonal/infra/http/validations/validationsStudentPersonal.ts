import { celebrate, Joi, Segments } from 'celebrate';

const postStudentPersonalValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    birthday: Joi.date().required(),
    telephone: Joi.string().trim().required(),
  },
});

export { postStudentPersonalValidation };
