import { registerAs } from '@nestjs/config';

import { UserServiceEnum, IUsersOptions } from '../interfaces';

export const registerUsersConfig = (key = 'users') =>
  registerAs(
    key,
    (): IUsersOptions => ({
      service: UserServiceEnum.InMemory,
    }),
  );
