import * as DataLoader from 'dataloader';
import { keyBy } from 'lodash';

import { IUsersService } from '../interfaces';
import { User } from '../models';

export class UsersDataLoader extends DataLoader<number, User> {
  constructor(usersService: IUsersService) {
    super(async (ids: number[]) => {
      const users = await usersService.findByIds(ids);
      const usersHash = keyBy(users, 'id');

      return ids.map((id) => usersHash[id]);
    });
  }
}
