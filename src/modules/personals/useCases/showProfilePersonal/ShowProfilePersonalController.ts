import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProfilePersonalUseCase } from './ShowProfilePersonalUseCase';

class ShowProfilePersonalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const showProfilePersonalUseCase = container.resolve(
      ShowProfilePersonalUseCase,
    );

    const personal = await showProfilePersonalUseCase.execute({
      user_id,
    });

    return res.status(201).json(classToClass(personal));
  }
}

export { ShowProfilePersonalController };
