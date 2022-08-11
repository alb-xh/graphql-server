import { ModuleMetadata, Type } from '@nestjs/common';

import { PostServiceEnum } from './post-service.enum';

export interface IPostsOptions {
  service: PostServiceEnum;
}

export interface IPostsOptionsFactory {
  createPostsOptions(): Promise<IPostsOptions> | IPostsOptions;
}

export interface IPostsModuleOptions
  extends Pick<ModuleMetadata, 'imports'>,
    IPostsOptions {
  isGlobal?: boolean;
}

export interface IPostsModuleOptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<IPostsOptionsFactory>;
  useClass?: Type<IPostsOptionsFactory>;
  useFactory?: (...args: unknown[]) => Promise<IPostsOptions> | IPostsOptions;
  inject?: any[];
}
