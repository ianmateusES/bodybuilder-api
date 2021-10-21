import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStudentWithProfessional } from '@modules/students/useCases/createStudentWithProfessional/CreateStudentWithProfessional';

import { CreateStudentPersonalUseCase } from './CreateStudentPersonalUseCase';

class CreateStudentController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: personal_id } = req.user;
    const { name, email, password, telephone, birthday } = req.body;

    const createStudentWithProfessional = container.resolve(
      CreateStudentWithProfessional,
    );

    const student = await createStudentWithProfessional.execute({
      name,
      email,
      password,
      telephone,
      birthday,
    });

    const createStudentPersonalUseCase = container.resolve(
      CreateStudentPersonalUseCase,
    );

    await createStudentPersonalUseCase.execute({
      personal_id,
      student_id: student.id,
      status: true,
    });

    return res.status(201).json(classToClass(student));
  }
}

export { CreateStudentController };
