import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { NutritionistRepository } from '@modules/nutritionists/infra/typeorm/repositories/NutritionistRepository';

import { AppError } from '../../../errors/AppError';

async function ensureNutritionist(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.user;

  const nutritionistRepository = container.resolve(NutritionistRepository);

  const nutritionist = await nutritionistRepository.findById(id);

  if (!nutritionist) {
    throw new AppError('User without permission', 401);
  }

  return next();
}

export { ensureNutritionist };
