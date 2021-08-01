import { NutritionistRepositoryInMemory } from '@modules/nutritionists/repositories/in-memory/NutritionistRepositoryInMemory';
import { CreateNutritionistUseCase } from '@modules/nutritionists/useCases/createNutritionist/CreateNutritionistUseCase';
import { PersonalRepositoryInMemory } from '@modules/personals/repositories/in-memory/PersonalRepositoryInMemory';
import { CreatePersonalUseCase } from '@modules/personals/useCases/createPersonal/CreatePersonalUseCase';
import { StudentRepositoryInMemory } from '@modules/students/repositories/in-memory/StudentRepositoryInMemory';
import { CreateStudentUseCase } from '@modules/students/useCases/createStudent/CreateStudentUseCase';
import { AppError } from '@shared/errors/AppError';

import { HashProviderInMemory } from '../../providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '../../repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let personalRepositoryInMemory: PersonalRepositoryInMemory;
let nutritionistRepositoryInMemory: NutritionistRepositoryInMemory;
let studentRepositoryInMemory: StudentRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createPersonalUseCase: CreatePersonalUseCase;
let createNutritionistUseCase: CreateNutritionistUseCase;
let createStudentUseCase: CreateStudentUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    personalRepositoryInMemory = new PersonalRepositoryInMemory(
      userRepositoryInMemory,
    );
    nutritionistRepositoryInMemory = new NutritionistRepositoryInMemory(
      userRepositoryInMemory,
    );
    studentRepositoryInMemory = new StudentRepositoryInMemory(
      userRepositoryInMemory,
    );

    createPersonalUseCase = new CreatePersonalUseCase(
      personalRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );

    createNutritionistUseCase = new CreateNutritionistUseCase(
      nutritionistRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );

    createStudentUseCase = new CreateStudentUseCase(
      studentRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      hashProviderInMemory,
      personalRepositoryInMemory,
      nutritionistRepositoryInMemory,
      studentRepositoryInMemory,
    );
  });

  it('should be able to authenticate Personal', async () => {
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

    const response = await authenticateUserUseCase.execute({
      email: 'matheussena@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.id).toEqual(personal.id);
  });

  it('should be able to authenticate Nutritionist', async () => {
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

    const response = await authenticateUserUseCase.execute({
      email: 'alanalmeida@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.id).toEqual(nutritionist.id);
  });

  it('should be able to authenticate Student', async () => {
    const student = await createStudentUseCase.execute({
      name: 'Adan Bueno',
      email: 'adanbueno@gmail.com',
      password: '123456',
      telephone: '(85) 9 9878-4466',
      birthday: '1996-10-10',
      street: 'Rua C',
      number: 250,
      district: 'Avi',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '62120-130',
    });

    const response = await authenticateUserUseCase.execute({
      email: 'adanbueno@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.id).toEqual(student.id);
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
