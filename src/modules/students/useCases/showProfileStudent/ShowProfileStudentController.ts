import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProfileStudentUseCase } from './ShowProfileStudentUseCase';

class ShowProfileStudentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const showProfileStudentUseCase = container.resolve(
      ShowProfileStudentUseCase,
    );

    const student = await showProfileStudentUseCase.execute({
      user_id,
    });

    return res.status(201).json(classToClass(student));
  }
}

export { ShowProfileStudentController };
