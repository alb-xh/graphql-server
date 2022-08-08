import { IPostsOptions } from './posts-options.interface';

export interface IPostsOptionsFactory {
  createPostsOptions(): Promise<IPostsOptions> | IPostsOptions;
}
