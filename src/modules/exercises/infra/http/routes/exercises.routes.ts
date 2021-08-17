import { Router } from 'express';

import { CreateExerciseController } from '@modules/exercises/useCases/createExercise/CreateExerciseController';
import { DeleteExerciseController } from '@modules/exercises/useCases/deleteExercise/DeleteExerciseController';
import { ListExercisesController } from '@modules/exercises/useCases/listExercises/ListExercisesController';
import { UpdateExercisesController } from '@modules/exercises/useCases/updateExercise/UpdateExercisesController';

import {
  postExerciseValidation,
  putExerciseValidation,
  deleteExerciseValidation,
} from '../validations/validationsExercisesRoutes';

// http://localhost:3333/exercises/me
const exercisesRoutes = Router();
const createExerciseController = new CreateExerciseController();
const deleteExerciseController = new DeleteExerciseController();
const listExercisesController = new ListExercisesController();
const updateExercisesController = new UpdateExercisesController();

exercisesRoutes.post(
  '/',
  postExerciseValidation,
  createExerciseController.handle,
);

exercisesRoutes.get('/', listExercisesController.handle);

exercisesRoutes.put(
  '/:id',
  putExerciseValidation,
  updateExercisesController.handle,
);

exercisesRoutes.delete(
  '/:id',
  deleteExerciseValidation,
  deleteExerciseController.handle,
);

export { exercisesRoutes };
