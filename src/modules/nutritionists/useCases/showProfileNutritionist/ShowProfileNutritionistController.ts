import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProfileNutritionistUseCase } from './ShowProfileNutritionistUseCase';

class ShowProfileNutritionistController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const showProfileNutritionistUseCase = container.resolve(
      ShowProfileNutritionistUseCase,
    );

    const nutritionist = await showProfileNutritionistUseCase.execute({
      user_id,
    });

    return res.status(201).json(classToClass(nutritionist));
  }
}

export { ShowProfileNutritionistController };
