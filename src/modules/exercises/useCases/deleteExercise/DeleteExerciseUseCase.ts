import { inject, injectable } from 'tsyringe';

import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { AppError } from '@shared/errors/AppError';

import { IExerciseRepository } from '../../repositories/IExerciseRepository';

interface IRequest {
  personal_id: string;
  exercise_id: string;
}

@injectable()
class DeleteExerciseUseCase {
  constructor(
    @inject('ExerciseRepository')
    private exerciseRepository: IExerciseRepository,

    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,
  ) {}

  public async execute({ personal_id, exercise_id }: IRequest): Promise<void> {
    const personal = await this.personalRepository.findById(personal_id);
    if (!personal) {
      throw new AppError('Unauthorized User');
    }

    const exercise = await this.exerciseRepository.findById(exercise_id);

    if (!exercise) {
      throw new AppError('Exercise does not exist');
    }

    if (exercise.personal_id !== personal_id) {
      throw new AppError('Personal does not have authorization');
    }

    await this.exerciseRepository.delete(exercise_id);
  }
}

export { DeleteExerciseUseCase };
