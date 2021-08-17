import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListExercisesUseCase } from './ListExercisesUseCase';

class ListExercisesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;

    const listExercisesUseCase = container.resolve(ListExercisesUseCase);

    const exercises = await listExercisesUseCase.execute({
      personal_id,
    });

    return res.status(201).json(exercises);
  }
}

export { ListExercisesController };
