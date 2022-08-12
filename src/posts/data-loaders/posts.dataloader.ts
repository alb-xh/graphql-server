import * as Dataloader from 'dataloader';
import { groupBy } from 'lodash';

import { Post } from '../models';
import { IPostsService } from '../interfaces';

export class PostsDataLoader extends Dataloader<number, Post[]> {
  constructor(postsService: IPostsService) {
    super(async (userIds: number[]) => {
      const posts = await postsService.findByUserIds(userIds);
      const postsHash = groupBy(posts, 'userId');

      return userIds.map((userId) => postsHash[userId] || []);
    });
  }
}
