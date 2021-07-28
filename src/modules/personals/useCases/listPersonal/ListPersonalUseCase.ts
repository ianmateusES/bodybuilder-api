import { inject, injectable } from 'tsyringe';

import { Personal } from '../../infra/typeorm/entities/Personal';
import { IPersonalRepository } from '../../repositories/IPersonalRepository';

@injectable()
class ListPersonalUseCase {
  constructor(
    @inject('PersonalRepository')
    private personalRepository: IPersonalRepository,
  ) {}

  public async execute(): Promise<Personal[]> {
    const personals = await this.personalRepository.findAll();

    return personals;
  }
}

export { ListPersonalUseCase };
