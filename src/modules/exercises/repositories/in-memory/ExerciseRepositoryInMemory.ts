import { ObjectId } from 'mongodb';

import { ICreateExerciseDTO } from '@modules/exercises/dtos/ICreateExerciseDTO';
import { Exercise } from '@modules/exercises/infra/typeorm/schemas/Exercise';

import { IExerciseRepository } from '../IExerciseRepository';

class ExerciseRepositoryInMemory implements IExerciseRepository {
  private exercises: Exercise[];

  constructor() {
    this.exercises = [];
  }

  public async findById(id: string): Promise<Exercise | undefined> {
    return this.exercises.find(exercise => exercise.id.equals(id));
  }

  public async findByPersonal(personal_id: string): Promise<Exercise[]> {
    return this.exercises.filter(
      exercise => exercise.personal_id === personal_id,
    );
  }

  public async create({
    name,
    group,
    member,
    personal_id,
  }: ICreateExerciseDTO): Promise<Exercise> {
    const exercise = new Exercise();

    Object.assign(exercise, {
      id: new ObjectId(),
      name,
      group,
      member,
      personal_id,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.exercises.push(exercise);

    return exercise;
  }

  public async save(exercise: Exercise): Promise<Exercise> {
    const findIndex = this.exercises.findIndex(
      findExercise => findExercise.id === exercise.id,
    );

    Object.assign(exercise, {
      update_at: new Date(),
    });

    this.exercises[findIndex] = exercise;

    return exercise;
  }

  public async delete(id: string): Promise<void> {
    this.exercises = this.exercises.filter(exercise => !exercise.id.equals(id));
  }

  public async deleteTrain(ids: string[]): Promise<void> {
    this.exercises = this.exercises.filter(
      ({ id }) => !ids.includes(id.toString()),
    );
  }

  public async deletePersonal(personal_id: string): Promise<void> {
    this.exercises = this.exercises.filter(
      exercise => exercise.personal_id !== personal_id,
    );
  }
}

export { ExerciseRepositoryInMemory };
