import { Router } from 'express';

// import { DeletePersonalController } from '../../../useCases/deletePersonal/DeletePersonalController';
import { ShowProfileStudentController } from '../../../useCases/showProfileStudent/ShowProfileStudentController';
import { UpdateStudentController } from '../../../useCases/updateStudent/UpdateStudentController';
import {
  putStudentValidation,
  // deleteStudentValidation,
} from '../validations/validationsStudentsRoutes';

// http://localhost:3333/students/profile
const studentsProfileRouter = Router();
const showProfileStudentController = new ShowProfileStudentController();
const updateStudentController = new UpdateStudentController();
// const deleteStudentController = new DeleteStudentController();

studentsProfileRouter.get('/', showProfileStudentController.handle);

studentsProfileRouter.put(
  '/',
  putStudentValidation,
  updateStudentController.handle,
);

// studentsProfileRouter.delete(
//   '/',
//   deleteStudentValidation,
//   deleteStudentController.handle,
// );

export { studentsProfileRouter };
