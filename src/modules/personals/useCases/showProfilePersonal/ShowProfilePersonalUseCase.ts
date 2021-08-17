import { injectable, inject } from 'tsyringe';

import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

import { Personal } from '../../infra/typeorm/entities/Personal';
import { IPersonalRepository } from '../../repositories/IPersonalRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfilePersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Personal> {
    const personal = await this.personalRepository.findById(user_id);
    if (!personal) {
      throw new AppError('Personal not found');
    }

    const address = await this.addressRepository.findById(
      personal.user.address_id,
    );

    Object.assign(personal.user, { address });

    return personal;
  }
}

export { ShowProfilePersonalUseCase };
