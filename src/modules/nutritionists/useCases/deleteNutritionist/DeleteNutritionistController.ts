import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteNutritionistUseCase } from './DeleteNutritionistUseCase';

class DeleteNutritionistController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const deleteNutritionistUseCase = container.resolve(
      DeleteNutritionistUseCase,
    );

    await deleteNutritionistUseCase.execute({ nutritionist_id: id });

    return res.status(204).send();
  }
}

export { DeleteNutritionistController };
