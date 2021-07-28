import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';

import { postSessionValidation } from '../validations/validationsUsersRoutes';

// http://localhost:3333/sessions
const sessionsRouter = Router();
const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post(
  '/',
  postSessionValidation,
  authenticateUserController.handle,
);

export { sessionsRouter };
