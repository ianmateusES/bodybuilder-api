import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

import { Student } from '../../infra/typeorm/entities/Student';
import { IStudentRepository } from '../../repositories/IStudentRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  birthday: string;
  telephone: string;
}

@injectable()
class CreateStudentWithProfessional {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    birthday,
    telephone,
  }: IRequest): Promise<Student> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);
    if (userEmailAlreadyExists) {
      throw new AppError('Email already used', 401);
    }

    const userTelephoneAlreadyExists =
      await this.userRepository.findByTelephone(telephone);
    if (userTelephoneAlreadyExists) {
      throw new AppError('Telephone already used', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      birthday: new Date(birthday),
      telephone,
      user_type: 'student',
    });

    const student = await this.studentRepository.create({
      user_id: user.id,
    });

    await this.userRepository.update(user.id, {
      professional_info_id: student.id,
    });

    return student;
  }
}

export { CreateStudentWithProfessional };
