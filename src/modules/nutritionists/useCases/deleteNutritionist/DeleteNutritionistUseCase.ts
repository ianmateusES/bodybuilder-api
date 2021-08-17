import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

import { INutritionistRepository } from '../../repositories/INutritionistRepository';

interface IRequest {
  nutritionist_id: string;
}

@injectable()
class DeleteNutritionistUseCase {
  constructor(
    @inject('NutritionistRepository')
    private nutritionistRepository: INutritionistRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ nutritionist_id }: IRequest): Promise<void> {
    const nutritionist = await this.nutritionistRepository.findById(
      nutritionist_id,
    );

    if (!nutritionist) {
      throw new AppError('Nutritionist does not exist');
    }

    await Promise.all([
      this.addressRepository.delete(nutritionist.user.address_id),
      this.nutritionistRepository.delete(nutritionist_id),
    ]);
  }
}

export { DeleteNutritionistUseCase };
