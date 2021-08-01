import { getRepository, Repository } from 'typeorm';

import { ICreateStudentDTO } from '../../../dtos/ICreateStudentDTO';
import { IStudentRepository } from '../../../repositories/IStudentRepository';
import { Student } from '../entities/Student';

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async findAll(): Promise<Student[]> {
    const student = await this.ormRepository.find({
      relations: ['user'],
    });

    return student;
  }

  public async findById(id: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      relations: ['user'],
      where: { id },
    });

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const student = await this.ormRepository
      .createQueryBuilder('student')
      .innerJoin('student.user', 'users')
      .where(`users.email= '${email}'`)
      .getOne();

    return student;
  }

  public async findByTelephone(
    telephone: string,
  ): Promise<Student | undefined> {
    const student = await this.ormRepository
      .createQueryBuilder('student')
      .innerJoin('student.user', 'users')
      .where(`users.telephone= '${telephone}'`)
      .getOne();

    return student;
  }

  public async create({ user_id }: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    const newStudent = await this.ormRepository.save(student);

    return newStudent;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { StudentRepository };
