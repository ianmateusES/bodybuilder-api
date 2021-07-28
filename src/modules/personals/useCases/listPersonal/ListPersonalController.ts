import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPersonalUseCase } from './ListPersonalUseCase';

class ListPersonalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listPersonalUseCase = container.resolve(ListPersonalUseCase);

    const personals = await listPersonalUseCase.execute();

    return res.status(201).json(classToClass(personals));
  }
}

export { ListPersonalController };
