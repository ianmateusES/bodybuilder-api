import { ICreateTrainDTO } from '../dtos/ICreateTrainDTO';
import { Train } from '../infra/typeorm/schemas/Train';

interface IPersonalRepository {
  findById(id: string): Promise<Train | undefined>;
  findByPersonal(personal_id: string): Promise<Train | undefined>;
  create(data: ICreateTrainDTO): Promise<Train>;
  save(train: Train): Promise<Train>;
  delete(id: string): Promise<void>;
}

export { IPersonalRepository };
