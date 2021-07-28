import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUserRepository } from '../IUserRepository';

class UserRepositoryInMemory implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async findByTelephone(telephone: string): Promise<User | undefined> {
    const user = this.users.find(user => user.telephone === telephone);

    return user;
  }

  public async create({
    name,
    email,
    password,
    telephone,
    birthday,
    user_type,
    address_id,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      telephone,
      birthday,
      user_type,
      address_id,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    Object.assign(user, {
      update_at: new Date(),
    });

    this.users[findIndex] = user;

    return user;
  }

  public async update(
    id: string,
    { professional_info_id }: Partial<ICreateUserDTO>,
  ): Promise<void> {
    const user = this.users.find(user => user.id === id) as User;

    user.professional_info_id = professional_info_id as string;
  }
}

export { UserRepositoryInMemory };
