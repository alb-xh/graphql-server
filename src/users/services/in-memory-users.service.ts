import { BadRequestException, NotFoundException } from '@nestjs/common';

import { User } from '../models';
import { IUsersService } from '../interfaces';
import { UsersArgs, NewUserInput, UpdateUserInput } from '../dto';

export class InMemoryUsersService implements IUsersService {
  private users: User[] = [];
  private idCount = 1;

  private getNewId(): number {
    return this.idCount++;
  }

  protected findByIndex(id: number): number {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException();

    return userIndex;
  }

  async findAll(userArgs: UsersArgs): Promise<User[]> {
    const { skip, take } = userArgs;

    return this.users.slice(skip, skip + take);
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return this.users.filter((user) => ids.includes(user.id));
  }

  async findOneById(id: number): Promise<User> {
    return this.users[this.findByIndex(id)];
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

  async create(newUserData: NewUserInput): Promise<User> {
    const userNameExists = this.users.some(
      ({ userName }) => userName === newUserData.userName,
    );

    if (userNameExists) {
      throw new BadRequestException(
        `Username: ${newUserData.userName} already exists!`,
      );
    }

    const newUser = {
      ...newUserData,
      id: this.getNewId(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async update(id: number, updateUserData: UpdateUserInput): Promise<User> {
    const userIndex = this.findByIndex(id);

    const updatedEntry = {
      ...this.users[userIndex],
      ...updateUserData,
    };

    this.users[userIndex] = updatedEntry;

    return updatedEntry;
  }

  async remove(id: number): Promise<void> {
    this.users.splice(this.findByIndex(id), 1);
  }
}
