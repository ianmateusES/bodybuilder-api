import { ICreatePersonalDTO } from '../dtos/ICreatePersonalDTO';
import { Personal } from '../infra/typeorm/entities/Personal';

interface IPersonalRepository {
  findAll(): Promise<Personal[]>;
  findById(id: string): Promise<Personal | undefined>;
  findByCREF(cref: string): Promise<Personal | undefined>;
  findByEmail(email: string): Promise<Personal | undefined>;
  findByTelephone(telephone: string): Promise<Personal | undefined>;
  create(data: ICreatePersonalDTO): Promise<Personal>;
  save(personal: Personal): Promise<Personal>;
  delete(id: string): Promise<void>;
}

export { IPersonalRepository };
