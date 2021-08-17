import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { PersonalRepository } from '@modules/personals/infra/typeorm/repositories/PersonalRespository';

import { AppError } from '../../../errors/AppError';

async function ensurePersonal(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.user;

  const personalRepository = container.resolve(PersonalRepository);

  const personal = await personalRepository.findById(id);

  if (!personal) {
    throw new AppError('User without permission', 401);
  }

  return next();
}

export { ensurePersonal };
