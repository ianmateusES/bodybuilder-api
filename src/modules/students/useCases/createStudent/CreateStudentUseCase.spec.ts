import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { StudentRepositoryInMemory } from '../../repositories/in-memory/StudentRepositoryInMemory';
import { CreateStudentUseCase } from './CreateStudentUseCase';

let studentRepositoryInMemory: StudentRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createStudentUseCase: CreateStudentUseCase;

describe('Create Student', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();
    studentRepositoryInMemory = new StudentRepositoryInMemory(
      userRepositoryInMemory,
    );

    createStudentUseCase = new CreateStudentUseCase(
      studentRepositoryInMemory,
      addressRepositoryInMemory,
      userRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able to create a new student', async () => {
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

    expect(student).toHaveProperty('id');
  });

  it('should not be able to create a new student with same email from another', async () => {
    await createStudentUseCase.execute({
      name: 'Adan Bueno',
      email: 'equal@gmail.com',
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

    await expect(
      createStudentUseCase.execute({
        name: 'Jonh Doe',
        email: 'equal@gmail.com',
        password: '123456',
        telephone: '(88) 9 9815-5566',
        birthday: '1996-10-10',
        street: 'Rua E',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new student with same telephone from another', async () => {
    await createStudentUseCase.execute({
      name: 'Adan Bueno',
      email: 'adanbueno@gmail.com',
      password: '123456',
      telephone: 'equal number',
      birthday: '1996-10-10',
      street: 'Rua C',
      number: 250,
      district: 'Avi',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '62120-130',
    });

    await expect(
      createStudentUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        telephone: 'equal number',
        birthday: '1996-10-10',
        street: 'Rua E',
        number: 120,
        district: 'Aqui',
        city: 'Fortaleza',
        uf: 'CE',
        cep: '60150-200',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
