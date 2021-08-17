import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateStudentUseCase } from './UpdateStudentUseCase';

class UpdateStudentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const {
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
    } = req.body;

    const updateStudentUseCase = container.resolve(UpdateStudentUseCase);

    const student = await updateStudentUseCase.execute({
      user_id,
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

    return res.status(201).json(classToClass(student));
  }
}

export { UpdateStudentController };
