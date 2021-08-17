import { Router } from 'express';

import { studentsProfileRouter } from './students.profile.routes';
import { studentsRoutes } from './students.routes';

// http://localhost:3333/students
const StudentRoutes = Router();

StudentRoutes.use('/profile', studentsProfileRouter);
StudentRoutes.use('/list', studentsRoutes);

export { StudentRoutes };
