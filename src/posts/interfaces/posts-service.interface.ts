import { Post } from '../models';
import { PostsArgs, NewPostInput, UpdatePostInput } from '../dto';

export interface IPostsService {
  findAll(args: PostsArgs): Promise<Post[]>;

  findOneById(id: number): Promise<Post>;

  exists(id: number): Promise<boolean>;

  create(data: NewPostInput): Promise<Post>;

  update(id: number, data: UpdatePostInput): Promise<Post>;

  remove(id: number): Promise<void>;
}
