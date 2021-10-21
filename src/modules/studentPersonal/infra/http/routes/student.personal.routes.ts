import { Router } from 'express';

import { CreateStudentController } from '../../../useCases/createStudentPersonal/CreateStudentController';
import { ListStudentPersonalController } from '../../../useCases/listStudentPersonal/ListStudentPersonalController';
import { postStudentPersonalValidation } from '../validations/validationsStudentPersonal';

// http://localhost:3333/personals/students
const StudentPersonalRoutes = Router();
const createStudentController = new CreateStudentController();
const listStudentPersonalController = new ListStudentPersonalController();

StudentPersonalRoutes.get('/', listStudentPersonalController.handle);

StudentPersonalRoutes.post(
  '/',
  postStudentPersonalValidation,
  createStudentController.handle,
);

export { StudentPersonalRoutes };
