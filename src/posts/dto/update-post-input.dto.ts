import { InputType, PickType } from '@nestjs/graphql';

import { Post } from '../models';

@InputType()
export class UpdatePostInput extends PickType(
  Post,
  ['title', 'text'],
  InputType,
) {}
