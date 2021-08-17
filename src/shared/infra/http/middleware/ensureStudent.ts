import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { StudentRepository } from '@modules/students/infra/typeorm/repositories/StudentRepository';

import { AppError } from '../../../errors/AppError';

async function ensureStudent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.user;

  const studentRepository = container.resolve(StudentRepository);

  const student = await studentRepository.findById(id);

  if (!student) {
    throw new AppError('User without permission', 401);
  }

  return next();
}

export { ensureStudent };
