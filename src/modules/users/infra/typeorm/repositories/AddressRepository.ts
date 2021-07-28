import { getRepository, Repository } from 'typeorm';

import { ICreateAddressDTO } from '@modules/users/dtos/ICreateAddressDTO';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';

import { Address } from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    return address;
  }

  public async create({
    street,
    number,
    district,
    city,
    uf,
    cep,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      street,
      number,
      district,
      city,
      uf,
      cep,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const newAddress = await this.ormRepository.save(address);

    return newAddress;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { AddressRepository };
