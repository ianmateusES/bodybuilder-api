import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePersonalUseCase } from './CreatePersonalUseCase';

class CreatePersonalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      birthday,
      telephone,
      cref,
      street,
      number,
      district,
      city,
      uf,
      cep,
    } = req.body;

    const createPersonalUseCase = container.resolve(CreatePersonalUseCase);

    const personal = await createPersonalUseCase.execute({
      name,
      email,
      password,
      birthday,
      telephone,
      user_type: 'personal',
      cref,
      street,
      number,
      district,
      city,
      uf,
      cep,
    });

    return res.status(201).json(classToClass(personal));
  }
}

export { CreatePersonalController };
