import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListNutritionistUseCase } from './ListNutritionistUseCase';

class ListNutritionistController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listNutritionistUseCase = container.resolve(ListNutritionistUseCase);

    const personals = await listNutritionistUseCase.execute();

    return res.status(201).json(classToClass(personals));
  }
}

export { ListNutritionistController };
