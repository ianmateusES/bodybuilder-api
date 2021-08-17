import { HashProviderInMemory } from '@modules/users/providers/HashProvider/in-memory/HashProviderInMemory';
import { AddressRepositoryInMemory } from '@modules/users/repositories/in-memory/AddressRepositoryInMemory';
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';

import { StudentRepositoryInMemory } from '../../repositories/in-memory/StudentRepositoryInMemory';
import { CreateStudentUseCase } from '../createStudent/CreateStudentUseCase';
import { DeleteStudentUseCase } from './DeleteStudentUseCase';

let studentRepositoryInMemory: StudentRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;

let createStudentUseCase: CreateStudentUseCase;
let deleteStudentUseCase: DeleteStudentUseCase;

describe('Delete Student', () => {
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

    deleteStudentUseCase = new DeleteStudentUseCase(
      studentRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able delete the profile student', async () => {
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

    expect(await studentRepositoryInMemory.findAll()).toEqual([student]);

    await deleteStudentUseCase.execute({
      student_id: student.id,
    });

    expect(await studentRepositoryInMemory.findAll()).toEqual([]);
  });
});
