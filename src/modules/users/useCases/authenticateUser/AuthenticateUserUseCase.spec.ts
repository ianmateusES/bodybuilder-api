import { PersonalRepositoryInMemory } from '@modules/personals/repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '@modules/personals/useCases/createPersonal/CreatePersonalUseCase';
import { AppError } from '@shared/errors/AppError';

import { HashProviderInMemory } from '../../providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '../../repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate Personal', () => {
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

    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      hashProviderInMemory,
      personalRepositoryInMemory,
    );
  });

  it('should be able to authenticate personal', async () => {
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

    const response = await authenticateUserUseCase.execute({
      email: 'matheussena@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.id).toEqual(personal.id);
  });

  it('should not be able to authenticate with non existing', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'matheussena@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createPersonalUseCase.execute({
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

    await expect(
      authenticateUserUseCase.execute({
        email: 'matheussena@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
