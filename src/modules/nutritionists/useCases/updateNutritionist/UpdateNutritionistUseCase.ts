import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

import { Nutritionist } from '../../infra/typeorm/entities/Nutritionist';
import { INutritionistRepository } from '../../repositories/INutritionistRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  birthday: string;
  telephone: string;
  crn: string;
  street: string;
  number: number;
  district: string;
  city: string;
  uf: string;
  cep: string;
}

@injectable()
class UpdateNutritionistUseCase {
  constructor(
    @inject('NutritionistRepository')
    private nutritionistRepository: INutritionistRepository,

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
    crn,
    street,
    number,
    district,
    city,
    uf,
    cep,
  }: IRequest): Promise<Nutritionist> {
    const nutritionist = await this.nutritionistRepository.findById(user_id);
    if (!nutritionist) {
      throw new AppError('Nutritionist not found');
    }

    if (email !== nutritionist.user.email) {
      const userWithUpdateEmail = await this.userRepository.findByEmail(email);
      if (userWithUpdateEmail) {
        throw new AppError('E-mail already in use');
      }
    }

    if (telephone !== nutritionist.user.telephone) {
      const userWithUpdateTelephone = await this.userRepository.findByTelephone(
        telephone,
      );
      if (userWithUpdateTelephone) {
        throw new AppError('Telephone already in use');
      }
    }

    if (crn !== nutritionist.crn) {
      const userWithUpdateCref = await this.nutritionistRepository.findByCRN(
        crn,
      );
      if (userWithUpdateCref) {
        throw new AppError('CRN already in use');
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
        nutritionist.user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      nutritionist.user.password = await this.hashProvider.generateHash(
        password,
      );
    }

    const user = await this.userRepository.findById(nutritionist.user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const address = await this.addressRepository.findById(
      nutritionist.user.address_id,
    );
    if (!address) {
      throw new AppError('Address does not exist');
    }

    Object.assign(address, { street, number, district, city, uf, cep });

    Object.assign(nutritionist, { crn });

    Object.assign(user, { name, email, birthday, telephone });

    await Promise.all([
      this.addressRepository.save(address),
      this.nutritionistRepository.save(nutritionist),
      this.userRepository.save(user),
    ]);

    Object.assign(user, { address });
    Object.assign(nutritionist, { user });

    return nutritionist;
  }
}

export { UpdateNutritionistUseCase };
