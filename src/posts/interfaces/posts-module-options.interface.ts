import { ModuleMetadata, Type } from '@nestjs/common';

import { IPostsOptions } from './posts-options.interface';

export interface IPostsModuleOptions
  extends Pick<ModuleMetadata, 'imports'>,
    IPostsOptions {
  isGlobal?: boolean;
}
