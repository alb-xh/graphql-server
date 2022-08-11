import * as DataLoader from 'dataloader';
import { keyBy } from 'lodash';

import { IUsersService } from '../interfaces';
import { User } from '../models';

export class UsersDataLoader {
  public getUserByIdLoader: DataLoader<number, User>;

  constructor(private readonly usersService: IUsersService) {
    this.initGetUserByIdLoader();
  }

  private initGetUserByIdLoader(): void {
    this.getUserByIdLoader = new DataLoader(async (ids: number[]) => {
      const users = await this.usersService.findByIds(ids);
      const usersHash = keyBy(users, 'id');

      return ids.map((id) => usersHash[id]);
    });
  }

  async loadUserById(id: number): Promise<User> {
    return this.getUserByIdLoader.load(id);
  }
}
