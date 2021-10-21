import { inject, injectable } from 'tsyringe';

import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { StudentPersonal } from '@modules/studentPersonal/infra/typeorm/entities/StudentPersonal';
import { IStudentPersonalRepository } from '@modules/studentPersonal/repositories/IStudentPersonalRepository';
import { IStudentRepository } from '@modules/students/repositories/IStudentRepository';
import { AppError } from '@shared/errors/AppError';

interface IResquest {
  personal_id: string;
  student_id: string;
  status?: boolean;
}

@injectable()
class CreateStudentPersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('StudentPersonalRepository')
    private studentPersonalRepository: IStudentPersonalRepository,
  ) {}
  public async execute({
    personal_id,
    student_id,
    status,
  }: IResquest): Promise<StudentPersonal> {
    const personalAlreadyExist = await this.personalRepository.findById(
      personal_id,
    );
    if (!personalAlreadyExist) {
      throw new AppError('Personal does not exist');
    }

    const studentAlreadyExist = await this.studentRepository.findById(
      student_id,
    );
    if (!studentAlreadyExist) {
      throw new AppError('Student does not exist');
    }

    const student_personal = await this.studentPersonalRepository.create({
      personal_id,
      student_id,
      status,
    });

    return student_personal;
  }
}

export { CreateStudentPersonalUseCase };
