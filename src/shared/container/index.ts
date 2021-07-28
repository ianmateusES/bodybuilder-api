import '@modules/users/providers';
import { container } from 'tsyringe';

import { PersonalRepository } from '@modules/personals/infra/typeorm/repositories/PersonalRespository';
import { IPersonalRepository } from '@modules/personals/repositories/IPersonalRepository';
import { AddressRepository } from '@modules/users/infra/typeorm/repositories/AddressRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IAddressRepository } from '@modules/users/repositories/IAddressRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

container.registerSingleton<IPersonalRepository>(
  'PersonalRepository',
  PersonalRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
