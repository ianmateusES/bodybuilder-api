import { Router } from 'express';

import { ListPersonalController } from '@modules/personals/useCases/listPersonal/ListPersonalController';

// http://localhost:3333/personals
const personalsRoutes = Router();
const listPersonalController = new ListPersonalController();

personalsRoutes.get('/', listPersonalController.handle);

export { personalsRoutes };
