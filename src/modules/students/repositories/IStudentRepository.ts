import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { Student } from '../infra/typeorm/entities/Student';

interface IStudentRepository {
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
  findByTelephone(telephone: string): Promise<Student | undefined>;
  create(data: ICreateStudentDTO): Promise<Student>;
  save(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
}

export { IStudentRepository };
