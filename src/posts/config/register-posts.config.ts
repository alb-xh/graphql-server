import { registerAs } from '@nestjs/config';

import { PostServiceEnum, IPostsOptions } from '../interfaces';

export const registerPostsConfig = (key = 'posts') =>
  registerAs(
    key,
    (): IPostsOptions => ({
      service: PostServiceEnum.InMemory,
    }),
  );
