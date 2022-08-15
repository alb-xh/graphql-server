import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../../users';

@ObjectType({ description: 'post' })
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  @MaxLength(50)
  title: string;

  @Field()
  @Column()
  @MaxLength(1000)
  text: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user?: User;
}
