import { injectable, inject } from 'tsyringe';

import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

import { Nutritionist } from '../../infra/typeorm/entities/Nutritionist';
import { INutritionistRepository } from '../../repositories/INutritionistRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileNutritionistUseCase {
  constructor(
    @inject('NutritionistRepository')
    private nutritionistRepository: INutritionistRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Nutritionist> {
    const nutritionist = await this.nutritionistRepository.findById(user_id);
    if (!nutritionist) {
      throw new AppError('Nutritionist not found');
    }

    const address = await this.addressRepository.findById(
      nutritionist.user.address_id,
    );

    Object.assign(nutritionist.user, { address });

    return nutritionist;
  }
}

export { ShowProfileNutritionistUseCase };
