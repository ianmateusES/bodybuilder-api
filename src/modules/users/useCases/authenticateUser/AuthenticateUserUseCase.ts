import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { jwt } from '@config/auth';
import { Nutritionist } from '@modules/nutritionists/infra/typeorm/entities/Nutritionist';
import { INutritionistRepository } from '@modules/nutritionists/repositories/INutritionistRepository';
import { Personal } from '@modules/personals/infra/typeorm/entities/Personal';
import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { Student } from '@modules/students/infra/typeorm/entities/Student';
import { IStudentRepository } from '@modules/students/repositories/IStudentRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';

import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Personal | Nutritionist | Student;
  token: string;
}

interface IRepositories {
  personal: IPersonalRepository;
  nutritionist: INutritionistRepository;
  student: IStudentRepository;
}

enum specializationEnum {
  personal = 'personal',
  nutritionist = 'nutritionist',
  student = 'student',
}

@injectable()
class AuthenticateUserUseCase {
  private repositories: IRepositories;
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

    @inject('NutritionistRepository')
    private nutritionistRepository: INutritionistRepository,

    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {
    this.repositories = {
      personal: this.personalRepository,
      nutritionist: this.nutritionistRepository,
      student: this.studentRepository,
    };
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const specialization = await this.repositories[
      user.user_type as specializationEnum
    ].findById(user.professional_info_id);

    if (!specialization) {
      throw new AppError('Specialization does not exist', 401);
    }

    Object.assign(specialization.user, { address: user.address });

    const { secret, expiresIn } = jwt;

    const token = sign({}, secret, {
      subject: specialization.id,
      expiresIn,
    });

    return {
      user: specialization,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
