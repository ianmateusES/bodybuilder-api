import { inject, injectable } from 'tsyringe';

import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { IStudentPersonalRepository } from '@modules/studentPersonal/repositories/IStudentPersonalRepository';
import { Student } from '@modules/students/infra/typeorm/entities/Student';
import { IStudentRepository } from '@modules/students/repositories/IStudentRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  personal_id: string;
}

@injectable()
class ListStudentPersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('StudentPersonalRepository')
    private studentPersonalRepository: IStudentPersonalRepository,
  ) {}
  public async execute({ personal_id }: IRequest): Promise<Student[]> {
    const personalAlreadyExist = await this.personalRepository.findById(
      personal_id,
    );
    if (!personalAlreadyExist) {
      throw new AppError('Personal does not exist');
    }

    const studentPersonal = await this.studentPersonalRepository.findByPersonal(
      personal_id,
    );

    if (!studentPersonal) {
      return [] as Student[];
    }

    const student_ids = studentPersonal.map(student => student.student_id);

    const students = await this.studentRepository.findByIds(student_ids);

    students.forEach(student =>
      Object.assign(student, {
        status: studentPersonal.find(s => s.student_id === student.id)?.status,
      }),
    );

    return students;
  }
}

export { ListStudentPersonalUseCase };
