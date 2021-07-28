import { Router } from 'express';

import { personalsRoutes } from '@modules/personals/infra/http/routes/personals.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/sessions', sessionsRouter);
routes.use('/personals', personalsRoutes);
routes.use('/users', usersRoutes);

export { routes };
