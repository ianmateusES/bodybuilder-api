import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePersonalUseCase } from './UpdatePersonalUseCase';

class UpdatePersonalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

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

    const updatePersonalUseCase = container.resolve(UpdatePersonalUseCase);

    const personal = await updatePersonalUseCase.execute({
      user_id,
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
    });

    return res.status(201).json(classToClass(personal));
  }
}

export { UpdatePersonalController };
