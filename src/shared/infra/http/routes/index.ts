import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ mensage: 'Application running' });
});

export { routes };
