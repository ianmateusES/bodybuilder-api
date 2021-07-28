import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePersonalUseCase } from '@modules/personals/useCases/createPersonal/CreatePersonalUseCase';
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

    const createPersonalUseCase = container.resolve(CreatePersonalUseCase);

    let user;
    switch (user_type) {
      case 'personal': {
        user = await createPersonalUseCase.execute({
          name,
          email,
          password,
          birthday,
          telephone,
          user_type,
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
        user = undefined;
        break;
      }
      case 'student': {
        user = undefined;
        break;
      }
      default:
        throw new AppError('User does not exist');
    }

    return res.status(201).json(classToClass(user));
  }
}

export { CreateUserController };
