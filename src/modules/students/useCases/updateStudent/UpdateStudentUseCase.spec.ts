import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
// import { AppError } from '@shared/errors/AppError';

import { StudentRepositoryInMemory } from '../../repositories/in-memory/StudentRepositoryInMemory';
import { CreateStudentUseCase } from '../createStudent/CreateStudentUseCase';
import { UpdateStudentUseCase } from './UpdateStudentUseCase';

let studentRepositoryInMemory: StudentRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createStudentUseCase: CreateStudentUseCase;
let updateStudentUseCase: UpdateStudentUseCase;

describe('Update Student', () => {
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

    updateStudentUseCase = new UpdateStudentUseCase(
      studentRepositoryInMemory,
      userRepositoryInMemory,
      addressRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able update the profile student', async () => {
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

    const updatePersonal = await updateStudentUseCase.execute({
      user_id: student.id,
      name: 'New Adan Bueno',
      email: 'newadanbueno@gmail.com',
      telephone: '(85) 9 9878-4466',
      birthday: '1996-10-10',
      street: 'Rua C',
      number: 250,
      district: 'Avi',
      city: 'Fortaleza',
      uf: 'CE',
      cep: '62120-130',
    });

    expect(updatePersonal.user.name).toBe('New Adan Bueno');
    expect(updatePersonal.user.email).toBe('newadanbueno@gmail.com');
  });
});
