import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

import { Student } from '../../infra/typeorm/entities/Student';
import { IStudentRepository } from '../../repositories/IStudentRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  birthday: string;
  telephone: string;
  street: string;
  number: number;
  district: string;
  city: string;
  uf: string;
  cep: string;
}

@injectable()
class UpdateStudentUseCase {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

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
    street,
    number,
    district,
    city,
    uf,
    cep,
  }: IRequest): Promise<Student> {
    const student = await this.studentRepository.findById(user_id);
    if (!student) {
      throw new AppError('Student not found');
    }

    if (email !== student.user.email) {
      const userWithUpdateEmail = await this.userRepository.findByEmail(email);
      if (userWithUpdateEmail) {
        throw new AppError('E-mail already in use');
      }
    }

    if (telephone !== student.user.telephone) {
      const userWithUpdateTelephone = await this.userRepository.findByTelephone(
        telephone,
      );
      if (userWithUpdateTelephone) {
        throw new AppError('Telephone already in use');
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
        student.user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      student.user.password = await this.hashProvider.generateHash(password);
    }

    const user = await this.userRepository.findById(student.user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const address = await this.addressRepository.findById(
      student.user.address_id,
    );
    if (!address) {
      throw new AppError('Address does not exist');
    }

    Object.assign(address, { street, number, district, city, uf, cep });

    Object.assign(user, { name, email, birthday, telephone });

    await Promise.all([
      this.addressRepository.save(address),
      this.studentRepository.save(student),
      this.userRepository.save(user),
    ]);

    Object.assign(user, { address });
    Object.assign(student, { user });

    return student;
  }
}

export { UpdateStudentUseCase };
