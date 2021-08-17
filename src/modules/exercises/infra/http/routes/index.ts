import { Router } from 'express';

import { exercisesRoutes } from './exercises.routes';

// http://localhost:3333/exercises
const ExerciseRoutes = Router();

ExerciseRoutes.use('/me', exercisesRoutes);

export { ExerciseRoutes };
