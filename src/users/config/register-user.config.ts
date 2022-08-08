import { registerAs } from '@nestjs/config';

import { IUserServices, IUsersOptions } from '../interfaces';

export const registerUsersConfig = (key = 'users') =>
  registerAs(
    key,
    (): IUsersOptions => ({
      service: IUserServices.InMemory,
    }),
  );
