import { Router } from 'express';

import { personalsProfileRouter } from './personals.profile.routes';
import { personalsRoutes } from './personals.routes';

// http://localhost:3333/personals
const PersonalRoutes = Router();

PersonalRoutes.use('/profile', personalsProfileRouter);
PersonalRoutes.use('/list', personalsRoutes);

export { PersonalRoutes };
