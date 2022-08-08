import { ModuleMetadata, Type } from '@nestjs/common';

import { IUsersOptionsFactory } from './users-options-factory.interface';
import { IUsersOptions } from './users-options.interface';

export interface IUsersModuleOptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<IUsersOptionsFactory>;
  useClass?: Type<IUsersOptionsFactory>;
  useFactory?: (...args: unknown[]) => Promise<IUsersOptions> | IUsersOptions;
  inject?: any[];
}
