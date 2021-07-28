import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';

import { postUserValidation } from '../validations/validationsUsersRoutes';

// http://localhost:3333/users
const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post('/', postUserValidation, createUserController.handle);

export { usersRoutes };
