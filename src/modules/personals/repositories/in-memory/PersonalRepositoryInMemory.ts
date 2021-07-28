import { ICreatePersonalDTO } from '@modules/personals/dtos/ICreatePersonalDTO';
import { Personal } from '@modules/personals/infra/typeorm/entities/Personal';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { IPersonalRepository } from '../IPersonalRepository';

class PersonalRepositoryInMemory implements IPersonalRepository {
  private personals: Personal[];
  private usersRepository: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.personals = [];
    this.usersRepository = usersRepository;
  }

  public async findAll(): Promise<Personal[]> {
    return this.personals;
  }

  public async findById(id: string): Promise<Personal | undefined> {
    const personal = this.personals.find(
      personal => personal.id === id,
    ) as Personal;

    const user = await this.usersRepository.findById(personal.user_id);

    Object.assign(personal, { user });

    return personal;
  }

  public async findByCREF(cref: string): Promise<Personal | undefined> {
    const personal = this.personals.find(personal => personal.cref === cref);

    return personal;
  }

  public async findByEmail(email: string): Promise<Personal | undefined> {
    const user = await this.usersRepository.findByEmail(email);
    const personal = this.personals.find(
      personal => personal.user_id === user?.id,
    );

    Object.assign(personal, { user });

    return personal;
  }

  public async findByTelephone(
    telephone: string,
  ): Promise<Personal | undefined> {
    const user = await this.usersRepository.findByTelephone(telephone);
    const personal = this.personals.find(
      personal => personal.user_id === user?.id,
    );

    return personal;
  }

  public async create({
    cref,
    user_id,
  }: ICreatePersonalDTO): Promise<Personal> {
    const personal = new Personal();

    Object.assign(personal, {
      cref,
      user_id,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.personals.push(personal);

    return personal;
  }

  public async save(personal: Personal): Promise<Personal> {
    const findIndex = this.personals.findIndex(
      findPersonal => findPersonal.id === personal.id,
    );

    this.personals[findIndex] = personal;

    return personal;
  }

  public async delete(id: string): Promise<void> {
    this.personals = this.personals.filter(personal => personal.id !== id);
  }
}

export { PersonalRepositoryInMemory };
