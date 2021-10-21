import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import { AppError } from '../../errors/AppError';
import { rateLimiter } from './middleware';
import { routes } from './routes';

const app = express();

app.use(rateLimiter);

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
