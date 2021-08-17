import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { NutritionistRepositoryInMemory } from '../../repositories/in-memory/NutritionistRepositoryInMemory';
import { CreateNutritionistUseCase } from '../createNutritionist/CreateNutritionistUseCase';
import { ShowProfileNutritionistUseCase } from './ShowProfileNutritionistUseCase';

let nutritionistRepositoryInMemory: NutritionistRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createNutritionistUseCase: CreateNutritionistUseCase;
let showProfileNutritionistUseCase: ShowProfileNutritionistUseCase;

describe('Show Profile Nutritionist', () => {
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

    showProfileNutritionistUseCase = new ShowProfileNutritionistUseCase(
      nutritionistRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able to show the profile nutritionist', async () => {
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

    const profile = await showProfileNutritionistUseCase.execute({
      user_id: nutritionist.id,
    });

    expect(profile.crn).toBe('122344');
    expect(profile.user.name).toBe('Alan Almeida');
    expect(profile.user.email).toBe('alanalmeida@gmail.com');
  });

  it('should not be able show the profile from non-existing user nutritionist', async () => {
    await expect(
      showProfileNutritionistUseCase.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
