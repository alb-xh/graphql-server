import { BadRequestException, NotFoundException } from '@nestjs/common';

import { IUsersService } from '../../users';

import { Post } from '../models';
import { IPostsService } from '../interfaces';
import { PostsArgs, NewPostInput, UpdatePostInput } from '../dto';

export class InMemoryPostsService implements IPostsService {
  private posts: Post[] = [];
  private idCount = 1;

  constructor(private readonly usersService: IUsersService) {}

  private getNewId(): number {
    return this.idCount++;
  }

  protected findByIndex(id: number): number {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new NotFoundException();

    return postIndex;
  }

  async findAll(PostArgs: PostsArgs): Promise<Post[]> {
    const { skip, take } = PostArgs;

    return this.posts.slice(skip, skip + take);
  }

  async findOneById(id: number): Promise<Post> {
    return this.posts[this.findByIndex(id)];
  }

  async exists(id: number): Promise<boolean> {
    try {
      this.findByIndex(id);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) return false;
      throw error;
    }
  }

  async create(newPostData: NewPostInput): Promise<Post> {
    const userExists = await this.usersService.exists(newPostData.userId);
    if (!userExists) {
      throw new BadRequestException(
        `User with id: ${newPostData.userId} doesn't exist`,
      );
    }

    const newPost = {
      ...newPostData,
      id: this.getNewId(),
    };

    this.posts.push(newPost);

    return newPost;
  }

  async update(id: number, updatePostData: UpdatePostInput): Promise<Post> {
    const postIndex = this.findByIndex(id);

    const updatedEntry = {
      ...this.posts[postIndex],
      ...updatePostData,
    };

    this.posts[postIndex] = updatedEntry;

    return updatedEntry;
  }

  async remove(id: number): Promise<void> {
    this.posts.splice(this.findByIndex(id), 1);
  }
}
