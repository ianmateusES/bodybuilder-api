import { ICreateStudentPersonalDTO } from '../dtos/ICreateStudentPersonalDTO';
import { StudentPersonal } from '../infra/typeorm/entities/StudentPersonal';

interface IStudentPersonalRepository {
  findByPersonal(personal_id: string): Promise<StudentPersonal[] | undefined>;
  create(data: ICreateStudentPersonalDTO): Promise<StudentPersonal>;
  save(studentPersonal: StudentPersonal): Promise<StudentPersonal>;
  delete(id: string): Promise<void>;
}

export { IStudentPersonalRepository };
