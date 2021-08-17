import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';

import { NutritionistRepositoryInMemory } from '../../repositories/in-memory/NutritionistRepositoryInMemory';
import { CreateNutritionistUseCase } from '../createNutritionist/CreateNutritionistUseCase';
import { DeleteNutritionistUseCase } from './DeleteNutritionistUseCase';

let nutritionistRepositoryInMemory: NutritionistRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createNutritionistUseCase: CreateNutritionistUseCase;
let deleteNutritionistUseCase: DeleteNutritionistUseCase;

describe('Delete Nutritionist', () => {
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

    deleteNutritionistUseCase = new DeleteNutritionistUseCase(
      nutritionistRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able delete the profile nutritionist', async () => {
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

    expect(await nutritionistRepositoryInMemory.findAll()).toEqual([
      nutritionist,
    ]);

    await deleteNutritionistUseCase.execute({
      nutritionist_id: nutritionist.id,
    });

    expect(await nutritionistRepositoryInMemory.findAll()).toEqual([]);
  });
});
