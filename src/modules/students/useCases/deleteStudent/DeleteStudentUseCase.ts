import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

import { IStudentRepository } from '../../repositories/IStudentRepository';

interface IRequest {
  student_id: string;
}

@injectable()
class DeleteStudentUseCase {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ student_id }: IRequest): Promise<void> {
    const student = await this.studentRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student does not exist');
    }

    await Promise.all([
      this.addressRepository.delete(student.user.address_id),
      this.studentRepository.delete(student_id),
    ]);
  }
}

export { DeleteStudentUseCase };
