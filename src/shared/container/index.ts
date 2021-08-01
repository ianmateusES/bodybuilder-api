import '@modules/users/providers';
import { container } from 'tsyringe';

import { NutritionistRepository } from '@modules/nutritionists/infra/typeorm/repositories/NutritionistRepository';
import { INutritionistRepository } from '@modules/nutritionists/repositories/INutritionistRepository';
import { PersonalRepository } from '@modules/personals/infra/typeorm/repositories/PersonalRespository';
import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { StudentRepository } from '@modules/students/infra/typeorm/repositories/StudentRepository';
import { IStudentRepository } from '@modules/students/repositories/IStudentRepository';
import { AddressRepository } from '@modules/users/infra/typeorm/repositories/AddressRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

container.registerSingleton<IPersonalRepository>(
  'PersonalRepository',
  PersonalRepository,
);

container.registerSingleton<INutritionistRepository>(
  'NutritionistRepository',
  NutritionistRepository,
);

container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
