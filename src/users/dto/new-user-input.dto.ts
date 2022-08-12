import { InputType, PickType } from '@nestjs/graphql';

import { User } from '../models';

@InputType()
export class NewUserInput extends PickType(
  User,
  ['userName', 'fullName', 'age'],
  InputType,
) {}
