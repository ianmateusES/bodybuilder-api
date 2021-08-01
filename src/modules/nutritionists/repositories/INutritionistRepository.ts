import { ICreateNutritionistDTO } from '../dtos/ICreateNutritionistDTO';
import { Nutritionist } from '../infra/typeorm/entities/Nutritionist';

interface INutritionistRepository {
  findAll(): Promise<Nutritionist[]>;
  findById(id: string): Promise<Nutritionist | undefined>;
  findByCRN(crn: string): Promise<Nutritionist | undefined>;
  findByEmail(email: string): Promise<Nutritionist | undefined>;
  findByTelephone(telephone: string): Promise<Nutritionist | undefined>;
  create(data: ICreateNutritionistDTO): Promise<Nutritionist>;
  save(nutritionist: Nutritionist): Promise<Nutritionist>;
  delete(id: string): Promise<void>;
}

export { INutritionistRepository };
