import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateExercisesUseCase } from './UpdateExercisesUseCase';

class UpdateExercisesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;
    const { id: exercise_id } = req.params;
    const { name, member, group } = req.body;

    const updateExercisesUseCase = container.resolve(UpdateExercisesUseCase);

    const exercises = await updateExercisesUseCase.execute({
      personal_id,
      exercise_id,
      name,
      group,
      member,
    });

    return res.status(201).json(exercises);
  }
}

export { UpdateExercisesController };
