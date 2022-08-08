import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Post } from '../models';
import { IPostsService } from '../interfaces';
import { PostsArgs, NewPostInput, UpdatePostInput } from '../dto';
import { POSTS_SERVICE_TOKEN } from '../constants';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    @Inject(POSTS_SERVICE_TOKEN)
    private readonly postsService: IPostsService,
  ) {}

  @Query(() => Post)
  async post(@Args('id') id: number): Promise<Post> {
    return this.postsService.findOneById(id);
  }

  @Query(() => [Post])
  async posts(@Args() postsArgs: PostsArgs): Promise<Post[]> {
    return this.postsService.findAll(postsArgs);
  }

  @Mutation(() => Post)
  async addPost(@Args('newPostData') newPostData: NewPostInput): Promise<Post> {
    return this.postsService.create(newPostData);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: number,
    @Args('updatedPostData') updatedPostData: UpdatePostInput,
  ): Promise<Post> {
    return this.postsService.update(id, updatedPostData);
  }

  @Mutation(() => Boolean)
  async removePost(@Args('id') id: number) {
    return this.postsService.remove(id);
  }
}
