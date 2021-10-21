import { PersonalRepositoryInMemory } from '@modules/personals/repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '@modules/personals/useCases/createPersonal/CreatePersonalUseCase';
import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
// import { AppError } from '@shared/errors/AppError';

import { ExerciseRepositoryInMemory } from '../../repositories/in-memory/ExerciseRepositoryInMemory';
import { CreateExerciseUseCase } from '../createExercise/CreateExerciseUseCase';
import { UpdateExercisesUseCase } from './UpdateExercisesUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let exerciseRepositoryInMemory: ExerciseRepositoryInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let createExerciseUseCase: CreateExerciseUseCase;
let updateExercisesUseCase: UpdateExercisesUseCase;

describe('Update Exercise', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    personalRepositoryInMemory = new PersonalRepositoryInMemory(
      userRepositoryInMemory,
    );

    exerciseRepositoryInMemory = new ExerciseRepositoryInMemory();

    createPersonalUseCase = new CreatePersonalUseCase(
      personalRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );

    createExerciseUseCase = new CreateExerciseUseCase(
      exerciseRepositoryInMemory,
      personalRepositoryInMemory,
    );

    updateExercisesUseCase = new UpdateExercisesUseCase(
      exerciseRepositoryInMemory,
      personalRepositoryInMemory,
    );
  });

  it('should be able to update a exercise', async () => {
    const personal = await createPersonalUseCase.execute({
      name: 'Matheus Sena',
      email: 'matheussena@gmail.com',
      password: '123456',
      telephone: '(85) 9 9988-6655',
      birthday: '1996-10-10',
      cref: '1122334455',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    const exercise = await createExerciseUseCase.execute({
      personal_id: personal.id,
      name: 'Supino reto',
      member: 'Peito',
      group: 'MS',
    });

    const newExercise = await updateExercisesUseCase.execute({
      exercise_id: String(exercise.id),
      name: 'Supino declinado',
      member: 'Peitoral',
      group: 'MS I',
      personal_id: personal.id,
    });

    expect(newExercise.name).toBe('Supino declinado');
    expect(newExercise.member).toBe('Peitoral');
    expect(newExercise.group).toBe('MS I');
  });
});