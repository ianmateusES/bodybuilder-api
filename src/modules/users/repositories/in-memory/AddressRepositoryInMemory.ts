import { ICreateAddressDTO } from '@modules/users/dtos/ICreateAddressDTO';
import { Address } from '@modules/users/infra/typeorm/entities/Address';

import { IAddressRepository } from '../IAddressRepository';

class AddressRepositoryInMemory implements IAddressRepository {
  private addresses: Address[];

  constructor() {
    this.addresses = [];
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = this.addresses.find(address => address.id === id);

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
    const address = new Address();

    Object.assign(address, {
      street,
      number,
      district,
      city,
      uf,
      cep,
      create_at: new Date(),
      update_at: new Date(),
    });

    this.addresses.push(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    Object.assign(address, { update_at: new Date() });

    this.addresses[findIndex] = address;

    return address;
  }
}

export { AddressRepositoryInMemory };
