import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { StudentRepositoryInMemory } from '../../repositories/in-memory/StudentRepositoryInMemory';
import { CreateStudentUseCase } from '../createStudent/CreateStudentUseCase';
import { ShowProfileStudentUseCase } from './ShowProfileStudentUseCase';

let studentRepositoryInMemory: StudentRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createStudentUseCase: CreateStudentUseCase;
let showProfileStudentUseCase: ShowProfileStudentUseCase;

describe('Show Profile Student', () => {
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

    showProfileStudentUseCase = new ShowProfileStudentUseCase(
      studentRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able to show the profile student', async () => {
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

    const profile = await showProfileStudentUseCase.execute({
      user_id: student.id,
    });

    expect(profile.user.name).toBe('Adan Bueno');
    expect(profile.user.email).toBe('adanbueno@gmail.com');
  });

  it('should not be able show the profile from non-existing user student', async () => {
    await expect(
      showProfileStudentUseCase.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
