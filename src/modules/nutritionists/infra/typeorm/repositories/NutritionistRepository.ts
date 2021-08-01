import { getRepository, Repository } from 'typeorm';

import { ICreateNutritionistDTO } from '../../../dtos/ICreateNutritionistDTO';
import { INutritionistRepository } from '../../../repositories/INutritionistRepository';
import { Nutritionist } from '../entities/Nutritionist';

class NutritionistRepository implements INutritionistRepository {
  private ormRepository: Repository<Nutritionist>;

  constructor() {
    this.ormRepository = getRepository(Nutritionist);
  }

  public async findAll(): Promise<Nutritionist[]> {
    const nutritionists = await this.ormRepository.find({
      relations: ['user'],
    });

    return nutritionists;
  }

  public async findById(id: string): Promise<Nutritionist | undefined> {
    const nutritionist = await this.ormRepository.findOne({
      relations: ['user'],
      where: { id },
    });

    return nutritionist;
  }

  public async findByCRN(crn: string): Promise<Nutritionist | undefined> {
    const nutritionist = await this.ormRepository.findOne({
      crn,
    });

    return nutritionist;
  }

  public async findByEmail(email: string): Promise<Nutritionist | undefined> {
    const nutritionist = await this.ormRepository
      .createQueryBuilder('nutritionist')
      .innerJoin('nutritionist.user', 'users')
      .where(`users.email= '${email}'`)
      .getOne();

    return nutritionist;
  }

  public async findByTelephone(
    telephone: string,
  ): Promise<Nutritionist | undefined> {
    const nutritionist = await this.ormRepository
      .createQueryBuilder('nutritionist')
      .innerJoin('nutritionist.user', 'users')
      .where(`users.telephone= '${telephone}'`)
      .getOne();

    return nutritionist;
  }

  public async create({
    crn,
    user_id,
  }: ICreateNutritionistDTO): Promise<Nutritionist> {
    const nutritionist = this.ormRepository.create({
      crn,
      user_id,
    });

    await this.ormRepository.save(nutritionist);

    return nutritionist;
  }

  public async save(nutritionist: Nutritionist): Promise<Nutritionist> {
    const newNutritionist = await this.ormRepository.save(nutritionist);

    return newNutritionist;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { NutritionistRepository };
