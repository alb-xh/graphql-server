import { IUsersOptions } from './users-options.interface';

export interface IUsersOptionsFactory {
  createUsersOptions(): Promise<IUsersOptions> | IUsersOptions;
}
