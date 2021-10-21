import { ICreateStudentPersonalDTO } from '../../dtos/ICreateStudentPersonalDTO';
import { StudentPersonal } from '../../infra/typeorm/entities/StudentPersonal';
import { IStudentPersonalRepository } from '../IStudentPersonalRepository';

class StudentPersonalRepositoryInMemory implements IStudentPersonalRepository {
  private studentPersonals: StudentPersonal[];

  constructor() {
    this.studentPersonals = [];
  }

  public async findByPersonal(
    personal_id: string,
  ): Promise<StudentPersonal[] | undefined> {
    const student_personal = this.studentPersonals.filter(
      studentPersonal => studentPersonal.personal_id === personal_id,
    );
    return student_personal;
  }

  public async create({
    personal_id,
    student_id,
    status = true,
  }: ICreateStudentPersonalDTO): Promise<StudentPersonal> {
    const studentPersonal = new StudentPersonal();

    Object.assign(studentPersonal, {
      personal_id,
      student_id,
      status,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.studentPersonals.push(studentPersonal);

    return studentPersonal;
  }

  public async save(
    studentPersonal: StudentPersonal,
  ): Promise<StudentPersonal> {
    const findIndex = this.studentPersonals.findIndex(
      findStudentPersonal => findStudentPersonal.id === studentPersonal.id,
    );

    Object.assign(studentPersonal, {
      update_at: new Date(),
    });

    this.studentPersonals[findIndex] = studentPersonal;

    return studentPersonal;
  }

  public async delete(id: string): Promise<void> {
    this.studentPersonals = this.studentPersonals.filter(
      studentPersonal => studentPersonal.id !== id,
    );
  }
}

export { StudentPersonalRepositoryInMemory };
