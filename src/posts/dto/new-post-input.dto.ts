import { InputType, PickType } from '@nestjs/graphql';

import { Post } from '../models';

@InputType()
export class NewPostInput extends PickType(
  Post,
  ['userId', 'text', 'title'],
  InputType,
) {}
