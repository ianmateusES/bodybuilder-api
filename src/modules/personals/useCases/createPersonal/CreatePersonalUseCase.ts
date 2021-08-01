import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

import { Personal } from '../../infra/typeorm/entities/Personal';
import { IPersonalRepository } from '../../repositories/IPersonalRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
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
class CreatePersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

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
    cref,
    street,
    number,
    district,
    city,
    uf,
    cep,
  }: IRequest): Promise<Personal> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);
    if (userEmailAlreadyExists) {
      throw new AppError('Email already used', 401);
    }

    const userTelephoneAlreadyExists =
      await this.userRepository.findByTelephone(telephone);
    if (userTelephoneAlreadyExists) {
      throw new AppError('CREF already used', 401);
    }

    const personalAlreadyExists = await this.personalRepository.findByCREF(
      cref,
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
      user_type: 'personal',
      address_id: address.id,
    });

    const personal = await this.personalRepository.create({
      cref,
      user_id: user.id,
    });

    await this.userRepository.update(user.id, {
      professional_info_id: personal.id,
    });

    return personal;
  }
}

export { CreatePersonalUseCase };
