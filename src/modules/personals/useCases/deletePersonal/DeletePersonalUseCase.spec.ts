import { ExerciseRepositoryInMemory } from '@modules/exercises/repositories/in-memory/ExerciseRepositoryInMemory';
import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';

import { PersonalRepositoryInMemory } from '../../repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '../createPersonal/CreatePersonalUseCase';
import { DeletePersonalUseCase } from './DeletePersonalUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let exerciseRepositoryInMemory: ExerciseRepositoryInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let deletePersonalUseCase: DeletePersonalUseCase;

describe('Delete Personal', () => {
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

    deletePersonalUseCase = new DeletePersonalUseCase(
      personalRepositoryInMemory,
      addressRepositoryInMemory,
      exerciseRepositoryInMemory,
    );
  });

  it('should be able delete the profile personal', async () => {
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

    expect(await personalRepositoryInMemory.findAll()).toEqual([personal]);

    await deletePersonalUseCase.execute({
      personal_id: personal.id,
    });

    expect(await personalRepositoryInMemory.findAll()).toEqual([]);
  });
});
