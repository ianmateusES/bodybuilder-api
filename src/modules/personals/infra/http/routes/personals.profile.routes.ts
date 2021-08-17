import { Router } from 'express';

import { DeletePersonalController } from '../../../useCases/deletePersonal/DeletePersonalController';
import { ShowProfilePersonalController } from '../../../useCases/showProfilePersonal/ShowProfilePersonalController';
import { UpdatePersonalController } from '../../../useCases/updatePersonal/UpdatePersonalController';
import {
  putPersonalValidation,
  deletePersonalValidation,
} from '../validations/validationsPersonalsRoutes';

// http://localhost:3333/personals/profile
const personalsProfileRouter = Router();
const showProfilePersonalController = new ShowProfilePersonalController();
const updatePersonalController = new UpdatePersonalController();
const deletePersonalController = new DeletePersonalController();

personalsProfileRouter.get('/', showProfilePersonalController.handle);

personalsProfileRouter.put(
  '/',
  putPersonalValidation,
  updatePersonalController.handle,
);

personalsProfileRouter.delete(
  '/',
  deletePersonalValidation,
  deletePersonalController.handle,
);

export { personalsProfileRouter };
