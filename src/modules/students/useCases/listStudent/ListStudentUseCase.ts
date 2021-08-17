import { inject, injectable } from 'tsyringe';

import { Student } from '../../infra/typeorm/entities/Student';
import { IStudentRepository } from '../../repositories/IStudentRepository';

@injectable()
class ListStudentUseCase {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(): Promise<Student[]> {
    const students = await this.studentRepository.findAll();

    return students;
  }
}

export { ListStudentUseCase };
