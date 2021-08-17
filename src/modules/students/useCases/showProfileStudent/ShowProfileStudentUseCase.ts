import { injectable, inject } from 'tsyringe';

import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

import { Student } from '../../infra/typeorm/entities/Student';
import { IStudentRepository } from '../../repositories/IStudentRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileStudentUseCase {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Student> {
    const student = await this.studentRepository.findById(user_id);
    if (!student) {
      throw new AppError('Student not found');
    }

    const address = await this.addressRepository.findById(
      student.user.address_id,
    );

    Object.assign(student.user, { address });

    return student;
  }
}

export { ShowProfileStudentUseCase };
