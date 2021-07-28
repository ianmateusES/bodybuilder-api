import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { jwt } from '@config/auth';
import { Personal } from '@modules/personals/infra/typeorm/entities/Personal';
import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';

// import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Personal;
  token: string;
}

interface IRepositories {
  personal: IPersonalRepository;
}

enum professionalEnum {
  personal = 'personal',
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
  ) {
    this.repositories = { personal: this.personalRepository };
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

    const professional = await this.repositories[
      user.user_type as professionalEnum
    ].findById(user.professional_info_id);

    if (!professional) {
      throw new AppError('Specialization does not exist', 401);
    }

    Object.assign(professional.user, { address: user.address });

    const { secret, expiresIn } = jwt;

    const token = sign({}, secret, {
      subject: professional.id,
      expiresIn,
    });

    return {
      user: professional,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
