import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeletePersonalUseCase } from './DeletePersonalUseCase';

class DeletePersonalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;

    const deletePersonalUseCase = container.resolve(DeletePersonalUseCase);

    await deletePersonalUseCase.execute({ personal_id });

    return res.status(204).send();
  }
}

export { DeletePersonalController };
