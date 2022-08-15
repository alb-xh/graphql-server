import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MinLength, MaxLength, Min, Max } from 'class-validator';

import { Post } from '../../posts';

@ObjectType({ description: 'user' })
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @MinLength(6)
  @MaxLength(16)
  userName: string;

  @Field()
  @Column()
  @MaxLength(100)
  fullName: string;

  @Field()
  @Column()
  @Min(18)
  @Max(100)
  age: number;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
