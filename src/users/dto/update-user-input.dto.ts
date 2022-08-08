import { InputType, PickType } from '@nestjs/graphql';

import { User } from '../models';

@InputType()
export class UpdateUserInput extends PickType(
  User,
  ['fullName', 'age'],
  InputType,
) {}
