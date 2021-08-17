import { IUserRepository } from '@modules/users/repositories/IUserRepository';

import { ICreateNutritionistDTO } from '../../dtos/ICreateNutritionistDTO';
import { Nutritionist } from '../../infra/typeorm/entities/Nutritionist';
import { INutritionistRepository } from '../INutritionistRepository';

class NutritionistRepositoryInMemory implements INutritionistRepository {
  private nutritionists: Nutritionist[];
  private usersRepository: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.nutritionists = [];
    this.usersRepository = usersRepository;
  }

  public async findAll(): Promise<Nutritionist[]> {
    return this.nutritionists;
  }

  public async findById(id: string): Promise<Nutritionist | undefined> {
    const nutritionist = this.nutritionists.find(
      nutritionist => nutritionist.id === id,
    );

    if (nutritionist) {
      const user = await this.usersRepository.findById(nutritionist.user_id);

      Object.assign(nutritionist, { user });
    }

    return nutritionist;
  }

  public async findByCRN(crn: string): Promise<Nutritionist | undefined> {
    const nutritionist = this.nutritionists.find(
      nutritionist => nutritionist.crn === crn,
    );

    return nutritionist;
  }

  public async findByEmail(email: string): Promise<Nutritionist | undefined> {
    const user = await this.usersRepository.findByEmail(email);
    const nutritionist = this.nutritionists.find(
      nutritionist => nutritionist.user_id === user?.id,
    );

    Object.assign(nutritionist, { user });

    return nutritionist;
  }

  public async findByTelephone(
    telephone: string,
  ): Promise<Nutritionist | undefined> {
    const user = await this.usersRepository.findByTelephone(telephone);
    const nutritionist = this.nutritionists.find(
      nutritionist => nutritionist.user_id === user?.id,
    );

    return nutritionist;
  }

  public async create({
    crn,
    user_id,
  }: ICreateNutritionistDTO): Promise<Nutritionist> {
    const nutritionist = new Nutritionist();

    Object.assign(nutritionist, {
      crn,
      user_id,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.nutritionists.push(nutritionist);

    return nutritionist;
  }

  public async save(nutritionist: Nutritionist): Promise<Nutritionist> {
    const findIndex = this.nutritionists.findIndex(
      findNutritionist => findNutritionist.id === nutritionist.id,
    );

    this.nutritionists[findIndex] = nutritionist;

    return nutritionist;
  }

  public async delete(id: string): Promise<void> {
    this.nutritionists = this.nutritionists.filter(
      nutritionist => nutritionist.id !== id,
    );
  }
}

export { NutritionistRepositoryInMemory };
