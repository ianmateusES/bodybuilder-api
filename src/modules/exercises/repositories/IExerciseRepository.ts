import { ICreateExerciseDTO } from '../dtos/ICreateExerciseDTO';
import { Exercise } from '../infra/typeorm/schemas/Exercise';

interface IExerciseRepository {
  findById(id: string): Promise<Exercise | undefined>;
  findByPersonal(personal_id: string): Promise<Exercise[]>;
  create(data: ICreateExerciseDTO): Promise<Exercise>;
  save(exercise: Exercise): Promise<Exercise>;
  delete(id: string): Promise<void>;
  deleteTrain(ids: string[]): Promise<void>;
  deletePersonal(personal_id: string): Promise<void>;
}

export { IExerciseRepository };
