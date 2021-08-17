import { inject, injectable } from 'tsyringe';

import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { AppError } from '@shared/errors/AppError';

import { Exercise } from '../../infra/typeorm/schemas/Exercise';
import { IExerciseRepository } from '../../repositories/IExerciseRepository';

interface IRequest {
  name: string;
  member: string;
  group: string;
  personal_id: string;
  exercise_id: string;
}

@injectable()
class UpdateExercisesUseCase {
  constructor(
    @inject('ExerciseRepository')
    private exerciseRepository: IExerciseRepository,

    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,
  ) {}

  public async execute({
    name,
    member,
    group,
    personal_id,
    exercise_id,
  }: IRequest): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findById(exercise_id);

    if (!exercise) {
      throw new AppError('Exercise does not exist');
    }

    if (exercise.personal_id !== personal_id) {
      throw new AppError('Personal does not have authorization');
    }

    Object.assign(exercise, {
      name,
      member,
      group,
    });

    await this.exerciseRepository.save(exercise);

    return exercise;
  }
}

export { UpdateExercisesUseCase };
