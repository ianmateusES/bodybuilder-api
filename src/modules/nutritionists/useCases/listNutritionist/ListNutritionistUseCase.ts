import { inject, injectable } from 'tsyringe';

import { Nutritionist } from '../../infra/typeorm/entities/Nutritionist';
import { INutritionistRepository } from '../../repositories/INutritionistRepository';

@injectable()
class ListNutritionistUseCase {
  constructor(
    @inject('NutritionistRepository')
    private nutritionistRepository: INutritionistRepository,
  ) {}

  public async execute(): Promise<Nutritionist[]> {
    const nutritionists = await this.nutritionistRepository.findAll();

    return nutritionists;
  }
}

export { ListNutritionistUseCase };
