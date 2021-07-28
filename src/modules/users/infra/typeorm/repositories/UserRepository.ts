import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { User } from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['address'],
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['address'],
      where: { email },
    });

    return user;
  }

  public async findByTelephone(telephone: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ telephone });

    return user;
  }

  public async create({
    email,
    password,
    name,
    birthday,
    telephone,
    user_type,
    professional_info_id,
    address_id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
      name,
      birthday,
      telephone,
      user_type,
      professional_info_id,
      address_id,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  public async update(
    id: string,
    { professional_info_id }: Partial<ICreateUserDTO>,
  ): Promise<void> {
    await this.ormRepository.update({ id }, { professional_info_id });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { UserRepository };
