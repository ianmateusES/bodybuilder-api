import { getRepository, Repository } from 'typeorm';

import { ICreatePersonalDTO } from '../../../dtos/ICreatePersonalDTO';
import { IPersonalRepository } from '../../../repositories/IPersonalRepository';
import { Personal } from '../entities/Personal';

class PersonalRepository implements IPersonalRepository {
  private ormRepository: Repository<Personal>;

  constructor() {
    this.ormRepository = getRepository(Personal);
  }

  public async findAll(): Promise<Personal[]> {
    const personals = await this.ormRepository.find({
      relations: ['user'],
    });

    return personals;
  }

  public async findById(id: string): Promise<Personal | undefined> {
    const personal = await this.ormRepository.findOne({
      relations: ['user'],
      where: { id },
    });

    return personal;
  }

  public async findByCREF(cref: string): Promise<Personal | undefined> {
    const personal = await this.ormRepository.findOne({
      cref,
    });

    return personal;
  }

  public async findByEmail(email: string): Promise<Personal | undefined> {
    const personal = await this.ormRepository
      .createQueryBuilder('personal')
      .innerJoin('personal.user', 'users')
      .where(`users.email= '${email}'`)
      .getOne();

    return personal;
  }

  public async findByTelephone(
    telephone: string,
  ): Promise<Personal | undefined> {
    const personal = await this.ormRepository
      .createQueryBuilder('personal')
      .innerJoin('personal.user', 'users')
      .where(`users.telephone= '${telephone}'`)
      .getOne();

    return personal;
  }

  public async create({
    cref,
    user_id,
  }: ICreatePersonalDTO): Promise<Personal> {
    const personal = this.ormRepository.create({
      cref,
      user_id,
    });

    await this.ormRepository.save(personal);

    return personal;
  }

  public async save(personal: Personal): Promise<Personal> {
    const newPersonal = await this.ormRepository.save(personal);

    return newPersonal;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { PersonalRepository };
