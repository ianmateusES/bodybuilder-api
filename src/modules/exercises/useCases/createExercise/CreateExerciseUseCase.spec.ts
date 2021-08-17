import { PersonalRepositoryInMemory } from '@modules/personals/repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '@modules/personals/useCases/createPersonal/CreatePersonalUseCase';
import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { ExerciseRepositoryInMemory } from '../../repositories/in-memory/ExerciseRepositoryInMemory';
import { CreateExerciseUseCase } from './CreateExerciseUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let exerciseRepositoryInMemory: ExerciseRepositoryInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let createExerciseUseCase: CreateExerciseUseCase;

describe('Create Exercise', () => {
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
  });

  it('should be able to create a new exercise', async () => {
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

    expect(exercise).toHaveProperty('id');
    expect(exercise).toHaveProperty('personal_id');
    expect(exercise.personal_id).toBe(personal.id);
  });

  it('should not be able to create a new exercise without existing personal', async () => {
    await expect(
      createExerciseUseCase.execute({
        personal_id: 'non-existing-personal-id',
        name: 'Supino reto',
        member: 'Peito',
        group: 'MS',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
