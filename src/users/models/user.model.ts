import { ObjectType, Field } from '@nestjs/graphql';
import { MinLength, MaxLength, Min, Max } from 'class-validator';

import { Post } from '../../posts';

@ObjectType({ description: 'user' })
export class User {
  @Field()
  id: number;

  @Field()
  @MinLength(6)
  @MaxLength(16)
  userName: string;

  @Field()
  @MaxLength(100)
  fullName: string;

  @Field()
  @Min(18)
  @Max(100)
  age: number;

  @Field(() => [Post])
  posts?: Post[];
}
