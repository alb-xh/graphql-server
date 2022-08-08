import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../models';
import { IUsersService } from '../interfaces';
import { UsersArgs, NewUserInput, UpdateUserInput } from '../dto';
import { USERS_SERVICE_TOKEN } from '../constants';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: IUsersService,
  ) {}

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Query(() => [User])
  async users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs);
  }

  @Mutation(() => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    return this.usersService.create(newUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('updatedUserData') updatedUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updatedUserData);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: number) {
    return this.usersService.remove(id);
  }
}
