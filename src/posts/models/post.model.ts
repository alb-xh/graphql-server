import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@ObjectType({ description: 'post' })
export class Post {
  @Field()
  id: number;

  @Field()
  userId: number;

  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  @MaxLength(1000)
  text: string;
}
