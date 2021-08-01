import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { NutritionistRepositoryInMemory } from '../../repositories/in-memory/NutritionistRepositoryInMemory';
import { CreateNutritionistUseCase } from './CreateNutritionistUseCase';

let nutritionistRepositoryInMemory: NutritionistRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createNutritionistUseCase: CreateNutritionistUseCase;

describe('Create Nutricionist', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    nutritionistRepositoryInMemory = new NutritionistRepositoryInMemory(
      userRepositoryInMemory,
    );

    createNutritionistUseCase = new CreateNutritionistUseCase(
      nutritionistRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able to create a new nutritionist', async () => {
    const nutritionist = await createNutritionistUseCase.execute({
      name: 'Alan Almeida',
      email: 'alanalmeida@gmail.com',
      password: '123456',
      telephone: '(85) 9 9815-4455',
      birthday: '1996-10-10',
      crn: '122344',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    expect(nutritionist).toHaveProperty('id');
  });

  it('should not be able to create a new nutritionist with same email from another', async () => {
    await createNutritionistUseCase.execute({
      name: 'Alan Almeida',
      email: 'equal@gmail.com',
      password: '123456',
      telephone: '(85) 9 9815-4455',
      birthday: '1996-10-10',
      crn: '122344',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    await expect(
      createNutritionistUseCase.execute({
        name: 'Jonh Doe',
        email: 'equal@gmail.com',
        password: '123456',
        telephone: '(88) 9 9815-5566',
        birthday: '1996-10-10',
        crn: '443221',
        street: 'Rua C',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new nutritionist with same telephone from another', async () => {
    await createNutritionistUseCase.execute({
      name: 'Alan Almeida',
      email: 'alanalmeida@gmail.com',
      password: '123456',
      telephone: 'equal number',
      birthday: '1996-10-10',
      crn: '122344',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    await expect(
      createNutritionistUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        telephone: 'equal number',
        birthday: '1996-10-10',
        crn: '443221',
        street: 'Rua C',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new nutritionist with same cref from another', async () => {
    await createNutritionistUseCase.execute({
      name: 'Alan Almeida',
      email: 'alanalmeida@gmail.com',
      password: '123456',
      telephone: '(85) 9 9988-6655',
      birthday: '1996-10-10',
      crn: 'equal number',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    await expect(
      createNutritionistUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        telephone: '(88) 9 9815-5566',
        birthday: '1996-10-10',
        crn: 'equal number',
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
