import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateNutritionistUseCase } from '@modules/nutritionists/useCases/createNutritionist/CreateNutritionistUseCase';
import { CreatePersonalUseCase } from '@modules/personals/useCases/createPersonal/CreatePersonalUseCase';
import { CreateStudentUseCase } from '@modules/students/useCases/createStudent/CreateStudentUseCase';
import { AppError } from '@shared/errors/AppError';

class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      birthday,
      telephone,
      user_type,
      cref_crn,
      street,
      number,
      district,
      city,
      uf,
      cep,
    } = req.body;

    let user;
    switch (user_type) {
      case 'personal': {
        const createPersonalUseCase = container.resolve(CreatePersonalUseCase);
        user = await createPersonalUseCase.execute({
          name,
          email,
          password,
          birthday,
          telephone,
          cref: cref_crn,
          street,
          number,
          district,
          city,
          uf,
          cep,
        });
        break;
      }
      case 'nutritionist': {
        const createNutritionistUseCase = container.resolve(
          CreateNutritionistUseCase,
        );
        user = await createNutritionistUseCase.execute({
          name,
          email,
          password,
          birthday,
          telephone,
          crn: cref_crn,
          street,
          number,
          district,
          city,
          uf,
          cep,
        });
        break;
      }
      case 'student': {
        const createStudentUseCase = container.resolve(CreateStudentUseCase);
        user = await createStudentUseCase.execute({
          name,
          email,
          password,
          birthday,
          telephone,
          street,
          number,
          district,
          city,
          uf,
          cep,
        });
        break;
      }
      default:
        throw new AppError('User does not exist');
    }

    return res.status(201).json(classToClass(user));
  }
}

export { CreateUserController };
