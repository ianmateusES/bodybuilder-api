import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
// import { AppError } from '@shared/errors/AppError';

import { NutritionistRepositoryInMemory } from '../../repositories/in-memory/NutritionistRepositoryInMemory';
import { CreateNutritionistUseCase } from '../createNutritionist/CreateNutritionistUseCase';
import { UpdateNutritionistUseCase } from './UpdateNutritionistUseCase';

let nutritionistRepositoryInMemory: NutritionistRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createNutritionistUseCase: CreateNutritionistUseCase;
let updateNutritionistUseCase: UpdateNutritionistUseCase;

describe('Update Nutritionist', () => {
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

    updateNutritionistUseCase = new UpdateNutritionistUseCase(
      nutritionistRepositoryInMemory,
      userRepositoryInMemory,
      addressRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able update the profile personal', async () => {
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

    const updateNutritionist = await updateNutritionistUseCase.execute({
      user_id: nutritionist.id,
      name: 'New Alan Almeida',
      email: 'newalanalmeida@gmail.com',
      telephone: '(85) 9 9815-4455',
      birthday: '1996-10-10',
      crn: '55443221',
      street: 'Rua A',
      number: 100,
      district: 'Ali',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '60100-100',
    });

    expect(updateNutritionist.crn).toBe('55443221');
    expect(updateNutritionist.user.name).toBe('New Alan Almeida');
    expect(updateNutritionist.user.email).toBe('newalanalmeida@gmail.com');
  });
});
