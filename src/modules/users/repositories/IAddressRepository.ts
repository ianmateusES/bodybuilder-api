import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { Address } from '../infra/typeorm/entities/Address';

interface IAddressRepository {
  findById(id: string): Promise<Address | undefined>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
}

export { IAddressRepository };
