import { User } from '../models';
import { UsersArgs, NewUserInput, UpdateUserInput } from '../dto';

export interface IUsersService {
  findAll(args: UsersArgs): Promise<User[]>;

  findByIds(ids: number[]): Promise<User[]>;

  findOneById(id: number): Promise<User>;

  exists(id: number): Promise<boolean>;

  create(data: NewUserInput): Promise<User>;

  update(id: number, data: UpdateUserInput): Promise<User>;

  remove(id: number): Promise<void>;
}
