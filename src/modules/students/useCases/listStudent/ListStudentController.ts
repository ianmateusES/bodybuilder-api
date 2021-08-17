import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStudentUseCase } from './ListStudentUseCase';

class ListStudentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listStudentUseCase = container.resolve(ListStudentUseCase);

    const students = await listStudentUseCase.execute();

    return res.status(201).json(classToClass(students));
  }
}

export { ListStudentController };
