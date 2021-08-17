import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

import { IPersonalRepository } from '../../repositories/IPersonalRepository';

interface IRequest {
  personal_id: string;
}

@injectable()
class DeletePersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ personal_id }: IRequest): Promise<void> {
    const personal = await this.personalRepository.findById(personal_id);

    if (!personal) {
      throw new AppError('Personal does not exist');
    }

    await Promise.all([
      this.addressRepository.delete(personal.user.address_id),
      this.personalRepository.delete(personal_id),
    ]);
  }
}

export { DeletePersonalUseCase };
