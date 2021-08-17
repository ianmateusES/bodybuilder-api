import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateNutritionistUseCase } from './UpdateNutritionistUseCase';

class UpdateNutritionistController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const {
      name,
      email,
      password,
      birthday,
      telephone,
      crn,
      street,
      number,
      district,
      city,
      uf,
      cep,
    } = req.body;

    const updateNutritionistUseCase = container.resolve(
      UpdateNutritionistUseCase,
    );

    const nutritionist = await updateNutritionistUseCase.execute({
      user_id,
      name,
      email,
      password,
      birthday,
      telephone,
      crn,
      street,
      number,
      district,
      city,
      uf,
      cep,
    });

    return res.status(201).json(classToClass(nutritionist));
  }
}

export { UpdateNutritionistController };
