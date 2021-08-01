import { inject, injectable } from 'tsyringe';

import { Nutritionist } from '@modules/nutritionists/infra/typeorm/entities/Nutritionist';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

import { INutritionistRepository } from '../../repositories/INutritionistRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
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
class CreateNutritionistUseCase {
  constructor(
    @inject('NutritionistRepository')
    private nutritionistRepository: INutritionistRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

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
    crn,
    street,
    number,
    district,
    city,
    uf,
    cep,
  }: IRequest): Promise<Nutritionist> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);
    if (userEmailAlreadyExists) {
      throw new AppError('Email already used', 401);
    }

    const userTelephoneAlreadyExists =
      await this.userRepository.findByTelephone(telephone);
    if (userTelephoneAlreadyExists) {
      throw new AppError('CREF already used', 401);
    }

    const personalAlreadyExists = await this.nutritionistRepository.findByCRN(
      crn,
    );
    if (personalAlreadyExists) {
      throw new AppError('CREF already used', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const address = await this.addressRepository.create({
      street,
      number,
      district,
      city,
      uf,
      cep,
    });

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      birthday: new Date(birthday),
      telephone,
      user_type: 'nutritionist',
      address_id: address.id,
    });

    const nutritionist = await this.nutritionistRepository.create({
      crn,
      user_id: user.id,
    });

    await this.userRepository.update(user.id, {
      professional_info_id: nutritionist.id,
    });

    return nutritionist;
  }
}

export { CreateNutritionistUseCase };
