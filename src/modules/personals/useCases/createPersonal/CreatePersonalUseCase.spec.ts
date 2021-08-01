import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { PersonalRepositoryInMemory } from '../../repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from './CreatePersonalUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createPersonalUseCase: CreatePersonalUseCase;

describe('Create Personal', () => {
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
  });

  it('should be able to create a new personal', async () => {
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

    expect(personal).toHaveProperty('id');
  });

  it('should not be able to create a new personal with same email from another', async () => {
    await createPersonalUseCase.execute({
      name: 'Matheus Sena',
      email: 'equal@gmail.com',
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

    await expect(
      createPersonalUseCase.execute({
        name: 'Jonh Doe',
        email: 'equal@gmail.com',
        password: '123456',
        telephone: '(88) 9 9815-5566',
        birthday: '1996-10-10',
        cref: '665544332211',
        street: 'Rua C',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new personal with same telephone from another', async () => {
    await createPersonalUseCase.execute({
      name: 'Matheus Sena',
      email: 'matheussena@gmail.com',
      password: '123456',
      telephone: 'equal number',
      birthday: '1996-10-10',
      cref: '1122334455',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    await expect(
      createPersonalUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        telephone: 'equal number',
        birthday: '1996-10-10',
        cref: '665544332211',
        street: 'Rua C',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new personal with same cref from another', async () => {
    await createPersonalUseCase.execute({
      name: 'Matheus Sena',
      email: 'matheussena@gmail.com',
      password: '123456',
      telephone: '(85) 9 9988-6655',
      birthday: '1996-10-10',
      cref: 'equal number',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    await expect(
      createPersonalUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        telephone: '(88) 9 9815-5566',
        birthday: '1996-10-10',
        cref: 'equal number',
        street: 'Rua C',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
