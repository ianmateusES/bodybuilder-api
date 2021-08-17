import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { PersonalRepositoryInMemory } from '../../repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '../createPersonal/CreatePersonalUseCase';
import { ShowProfilePersonalUseCase } from './ShowProfilePersonalUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let showProfilePersonalUseCase: ShowProfilePersonalUseCase;

describe('Show Profile Personal', () => {
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

    showProfilePersonalUseCase = new ShowProfilePersonalUseCase(
      personalRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able to show the profile personal', async () => {
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

    const profile = await showProfilePersonalUseCase.execute({
      user_id: personal.id,
    });

    expect(profile.cref).toBe('1122334455');
    expect(profile.user.name).toBe('Matheus Sena');
    expect(profile.user.email).toBe('matheussena@gmail.com');
  });

  it('should not be able show the profile from non-existing user pesonal', async () => {
    await expect(
      showProfilePersonalUseCase.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
