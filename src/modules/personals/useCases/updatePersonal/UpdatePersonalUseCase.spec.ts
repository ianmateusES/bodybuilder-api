import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
// import { AppError } from '@shared/errors/AppError';

import { PersonalRepositoryInMemory } from '../../repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '../createPersonal/CreatePersonalUseCase';
import { UpdatePersonalUseCase } from './UpdatePersonalUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let updatePersonalUseCase: UpdatePersonalUseCase;

describe('Update Personal', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    personalRepositoryInMemory = new PersonalRepositoryInMemory(
      userRepositoryInMemory,
    );

    createPersonalUseCase = new CreatePersonalUseCase(
      personalRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );

    updatePersonalUseCase = new UpdatePersonalUseCase(
      personalRepositoryInMemory,
      userRepositoryInMemory,
      addressRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able update the profile personal', async () => {
    const personal = await createPersonalUseCase.execute({
      name: 'Matheus Sena',
      email: 'matheussena@gmail.com',
      password: '123456',
      telephone: '(85) 9 9988-6655',
      birthday: '1996-10-10',
      user_type: 'personal',
      cref: '1122334455',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    const updatePersonal = await updatePersonalUseCase.execute({
      user_id: personal.id,
      name: 'New Matheus Sena',
      email: 'newmatheussena@gmail.com',
      telephone: '(85) 9 9988-6655',
      birthday: '1996-10-10',
      cref: '665544332211',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    expect(updatePersonal.cref).toBe('665544332211');
    expect(updatePersonal.user.name).toBe('New Matheus Sena');
    expect(updatePersonal.user.email).toBe('newmatheussena@gmail.com');
  });
});
