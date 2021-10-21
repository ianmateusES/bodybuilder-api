import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { ICreateStudentDTO } from '../../dtos/ICreateStudentDTO';
import { Student } from '../../infra/typeorm/entities/Student';
import { IStudentRepository } from '../IStudentRepository';

class StudentRepositoryInMemory implements IStudentRepository {
  private students: Student[];
  private usersRepository: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.students = [];
    this.usersRepository = usersRepository;
  }

  public async findAll(): Promise<Student[]> {
    return this.students;
  }

  public async findById(id: string): Promise<Student | undefined> {
    const student = this.students.find(student => student.id === id);

    if (student) {
      const user = await this.usersRepository.findById(student.user_id);

      Object.assign(student, { user });
    }

    return student;
  }

  public async findByIds(ids: string[]): Promise<Student[]> {
    const student = this.students.filter(student => ids.includes(student.id));

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const user = await this.usersRepository.findByEmail(email);
    const student = this.students.find(student => student.user_id === user?.id);

    Object.assign(student, { user });

    return student;
  }

  public async findByTelephone(
    telephone: string,
  ): Promise<Student | undefined> {
    const user = await this.usersRepository.findByTelephone(telephone);
    const student = this.students.find(student => student.user_id === user?.id);

    return student;
  }

  public async create({ user_id }: ICreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, {
      user_id,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.students.push(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    const findIndex = this.students.findIndex(
      findStudent => findStudent.id === student.id,
    );

    this.students[findIndex] = student;

    return student;
  }

  public async delete(id: string): Promise<void> {
    this.students = this.students.filter(student => student.id !== id);
  }
}

export { StudentRepositoryInMemory };
