import { ModuleMetadata, Type } from '@nestjs/common';

import { IPostsOptionsFactory } from './posts-options-factory.interface';
import { IPostsOptions } from './posts-options.interface';

export interface IPostsModuleOptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<IPostsOptionsFactory>;
  useClass?: Type<IPostsOptionsFactory>;
  useFactory?: (...args: unknown[]) => Promise<IPostsOptions> | IPostsOptions;
  inject?: any[];
}
