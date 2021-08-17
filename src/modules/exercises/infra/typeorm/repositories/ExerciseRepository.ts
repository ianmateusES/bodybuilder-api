import { getMongoRepository, MongoRepository } from 'typeorm';

import { ICreateExerciseDTO } from '@modules/exercises/dtos/ICreateExerciseDTO';
import { IExerciseRepository } from '@modules/exercises/repositories/IExerciseRepository';

import { Exercise } from '../schemas/Exercise';

class ExerciseRepository implements IExerciseRepository {
  private ormRepository: MongoRepository<Exercise>;

  constructor() {
    this.ormRepository = getMongoRepository(Exercise, 'mongo');
  }

  public async findById(id: string): Promise<Exercise | undefined> {
    const exercise = await this.ormRepository.findOne(id);

    return exercise;
  }

  public async findByPersonal(personal_id: string): Promise<Exercise[]> {
    const exercises = await this.ormRepository.find({ personal_id });

    return exercises;
  }

  public async create({
    name,
    group,
    member,
    personal_id,
  }: ICreateExerciseDTO): Promise<Exercise> {
    const exercises = this.ormRepository.create({
      name,
      group,
      member,
      personal_id,
    });

    await this.ormRepository.save(exercises);

    return exercises;
  }

  public async save(exercise: Exercise): Promise<Exercise> {
    const newExercise = await this.ormRepository.save(exercise);

    return newExercise;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async deleteTrain(ids: string[]): Promise<void> {
    await this.ormRepository.delete(ids);
  }

  public async deletePersonal(personal_id: string): Promise<void> {
    await this.ormRepository.delete({ personal_id });
  }
}

export { ExerciseRepository };
