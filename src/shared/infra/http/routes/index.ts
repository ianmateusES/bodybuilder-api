import { Router } from 'express';

import { ExerciseRoutes } from '@modules/exercises/infra/http/routes';
import { NutritionistRoutes } from '@modules/nutritionists/infra/http/routes';
import { PersonalRoutes } from '@modules/personals/infra/http/routes';
import { StudentRoutes } from '@modules/students/infra/http/routes';
import { usersRoutes, sessionsRouter } from '@modules/users/infra/http/routes';

import {
  ensureAuthenticated,
  ensurePersonal,
  ensureNutritionist,
  ensureStudent,
} from '../middleware';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRoutes);

routes.use(ensureAuthenticated);

// Personal routes
routes.use('/personals', ensurePersonal, PersonalRoutes);
routes.use('/exercises', ensurePersonal, ExerciseRoutes);

// Nutritionist routes
routes.use('/nutritionists', ensureNutritionist, NutritionistRoutes);

// Student routes
routes.use('/students', ensureStudent, StudentRoutes);

export { routes };
