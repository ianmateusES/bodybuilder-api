import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateExerciseUseCase } from './CreateExerciseUseCase';

class CreateExerciseController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;
    const { name, member, group } = req.body;

    const createExerciseUseCase = container.resolve(CreateExerciseUseCase);

    const exercise = await createExerciseUseCase.execute({
      name,
      member,
      group,
      personal_id,
    });

    return res.status(201).json(exercise);
  }
}

export { CreateExerciseController };
