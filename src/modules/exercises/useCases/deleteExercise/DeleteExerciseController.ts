import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteExerciseUseCase } from './DeleteExerciseUseCase';

class DeleteExerciseController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;
    const { id: exercise_id } = req.params;

    const deleteExerciseUseCase = container.resolve(DeleteExerciseUseCase);

    await deleteExerciseUseCase.execute({
      personal_id,
      exercise_id,
    });

    return res.status(204).send();
  }
}

export { DeleteExerciseController };
