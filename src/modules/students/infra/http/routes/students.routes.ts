import { Router } from 'express';

import { ListStudentController } from '../../../useCases/listStudent/ListStudentController';

// http://localhost:3333/students
const studentsRoutes = Router();
const listStudentController = new ListStudentController();

studentsRoutes.get('/', listStudentController.handle);

export { studentsRoutes };
