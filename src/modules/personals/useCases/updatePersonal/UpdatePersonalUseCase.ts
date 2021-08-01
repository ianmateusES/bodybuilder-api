import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

import { Personal } from '../../infra/typeorm/entities/Personal';
import { IPersonalRepository } from '../../repositories/IPersonalRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  birthday: string;
  telephone: string;
  cref: string;
  street: string;
  number: number;
  district: string;
  city: string;
  uf: string;
  cep: string;
}

@injectable()
class UpdatePersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
    birthday,
    telephone,
    cref,
    street,
    number,
    district,
    city,
    uf,
    cep,
  }: IRequest): Promise<Personal> {
    const personal = await this.personalRepository.findById(user_id);
    if (!personal) {
      throw new AppError('Personal not found');
    }

    if (email !== personal.user.email) {
      const userWithUpdateEmail = await this.userRepository.findByEmail(email);
      if (userWithUpdateEmail) {
        throw new AppError('E-mail already in use');
      }
    }

    if (telephone !== personal.user.telephone) {
      const userWithUpdateTelephone = await this.userRepository.findByTelephone(
        telephone,
      );
      if (userWithUpdateTelephone) {
        throw new AppError('Telephone already in use');
      }
    }

    if (cref !== personal.cref) {
      const userWithUpdateCref = await this.personalRepository.findByCREF(cref);
      if (userWithUpdateCref) {
        throw new AppError('Cref already in use');
      }
    }

    if (password && !old_password) {
      throw new AppError(
        'You meed to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        personal.user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      personal.user.password = await this.hashProvider.generateHash(password);
    }

    const user = await this.userRepository.findById(personal.user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const address = await this.addressRepository.findById(
      personal.user.address_id,
    );
    if (!address) {
      throw new AppError('Address does not exist');
    }

    Object.assign(address, { street, number, district, city, uf, cep });

    Object.assign(personal, { cref });

    Object.assign(user, { name, email, birthday, telephone });

    await Promise.all([
      this.addressRepository.save(address),
      this.personalRepository.save(personal),
      this.userRepository.save(user),
    ]);

    Object.assign(user, { address });
    Object.assign(personal, { user });

    return personal;
  }
}

export { UpdatePersonalUseCase };
