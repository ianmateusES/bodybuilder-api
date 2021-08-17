import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteStudentUseCase } from './DeleteStudentUseCase';

class DeleteStudentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const deleteStudentUseCase = container.resolve(DeleteStudentUseCase);

    await deleteStudentUseCase.execute({ student_id: id });

    return res.status(204).send();
  }
}

export { DeleteStudentController };
