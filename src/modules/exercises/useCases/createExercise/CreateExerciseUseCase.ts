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
}

@injectable()
class CreateExerciseUseCase {
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
  }: IRequest): Promise<Exercise> {
    const personal = await this.personalRepository.findById(personal_id);
    if (!personal) {
      throw new AppError('Personal does not exist', 401);
    }

    const exercise = await this.exerciseRepository.create({
      name,
      member,
      group,
      personal_id,
    });

    return exercise;
  }
}

export { CreateExerciseUseCase };
