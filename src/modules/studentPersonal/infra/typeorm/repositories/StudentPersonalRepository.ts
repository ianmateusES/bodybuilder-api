import { getRepository, Repository } from 'typeorm';

import { ICreateStudentPersonalDTO } from '../../../dtos/ICreateStudentPersonalDTO';
import { IStudentPersonalRepository } from '../../../repositories/IStudentPersonalRepository';
import { StudentPersonal } from '../entities/StudentPersonal';

class StudentPersonalRepository implements IStudentPersonalRepository {
  private ormRepository: Repository<StudentPersonal>;

  constructor() {
    this.ormRepository = getRepository(StudentPersonal);
  }

  public async findByPersonal(
    personal_id: string,
  ): Promise<StudentPersonal[] | undefined> {
    const student = await this.ormRepository.find({
      personal_id,
    });

    return student;
  }

  public async create({
    personal_id,
    status,
    student_id,
  }: ICreateStudentPersonalDTO): Promise<StudentPersonal> {
    const studentPersonal = this.ormRepository.create({
      personal_id,
      status,
      student_id,
    });

    await this.ormRepository.save(studentPersonal);

    return studentPersonal;
  }

  public async save(
    studentPersonal: StudentPersonal,
  ): Promise<StudentPersonal> {
    const newStudentPersonal = await this.ormRepository.save(studentPersonal);

    return newStudentPersonal;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { StudentPersonalRepository };
