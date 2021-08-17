import { celebrate, Joi, Segments } from 'celebrate';

const idValidation = {
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
};

const bodyExerciseValidation = {
  [Segments.BODY]: {
    name: Joi.string().trim().required(),
    member: Joi.string().trim().required(),
    group: Joi.string().trim().required(),
  },
};

const postExerciseValidation = celebrate({
  ...bodyExerciseValidation,
});

const putExerciseValidation = celebrate({
  ...idValidation,
  ...bodyExerciseValidation,
});

const deleteExerciseValidation = celebrate({
  ...idValidation,
});

export {
  postExerciseValidation,
  putExerciseValidation,
  deleteExerciseValidation,
};
