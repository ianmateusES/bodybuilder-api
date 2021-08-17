import { inject, injectable } from 'tsyringe';

import { Exercise } from '../../infra/typeorm/schemas/Exercise';
import { IExerciseRepository } from '../../repositories/IExerciseRepository';

interface IRequest {
  personal_id: string;
}

@injectable()
class ListExercisesUseCase {
  constructor(
    @inject('ExerciseRepository')
    private exerciseRepository: IExerciseRepository,
  ) {}

  public async execute({ personal_id }: IRequest): Promise<Exercise[]> {
    const exercises = await this.exerciseRepository.findByPersonal(personal_id);

    return exercises;
  }
}

export { ListExercisesUseCase };
