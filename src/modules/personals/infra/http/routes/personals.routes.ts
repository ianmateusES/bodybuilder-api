import { Router } from 'express';

import { ListPersonalController } from '../../../useCases/listPersonal/ListPersonalController';

// http://localhost:3333/personals/list
const personalsRoutes = Router();
const listPersonalController = new ListPersonalController();

personalsRoutes.get('/list', listPersonalController.handle);

export { personalsRoutes };
