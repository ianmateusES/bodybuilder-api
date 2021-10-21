import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStudentPersonalUseCase } from './ListStudentPersonalUseCase';

class ListStudentPersonalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;

    const listStudentPersonalUseCase = container.resolve(
      ListStudentPersonalUseCase,
    );

    const students = await listStudentPersonalUseCase.execute({ personal_id });

    return res.status(201).json(classToClass(students));
  }
}

export { ListStudentPersonalController };
