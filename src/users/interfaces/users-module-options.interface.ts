import { ModuleMetadata, Type } from '@nestjs/common';

import { UserServiceEnum } from './user-service.enum';

export interface IUsersOptions {
  service: UserServiceEnum;
}

export interface IUsersOptionsFactory {
  createUsersOptions(): Promise<IUsersOptions> | IUsersOptions;
}

export interface IUsersModuleOptions extends IUsersOptions {
  isGlobal?: boolean;
}

export interface IUsersModuleOptionsAsync
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<IUsersOptionsFactory>;
  useClass?: Type<IUsersOptionsFactory>;
  useFactory?: (...args: unknown[]) => Promise<IUsersOptions> | IUsersOptions;
  inject?: any[];
}
