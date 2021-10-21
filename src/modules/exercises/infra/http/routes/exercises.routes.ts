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

// http://localhost:3333/exercises
const ExercisesRoutes = Router();
const createExerciseController = new CreateExerciseController();
const deleteExerciseController = new DeleteExerciseController();
const listExercisesController = new ListExercisesController();
const updateExercisesController = new UpdateExercisesController();

ExercisesRoutes.post(
  '/',
  postExerciseValidation,
  createExerciseController.handle,
);

ExercisesRoutes.get('/', listExercisesController.handle);

ExercisesRoutes.put(
  '/:id',
  putExerciseValidation,
  updateExercisesController.handle,
);

ExercisesRoutes.delete(
  '/:id',
  deleteExerciseValidation,
  deleteExerciseController.handle,
);

export { ExercisesRoutes };
