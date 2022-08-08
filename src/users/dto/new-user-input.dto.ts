import { InputType, OmitType } from '@nestjs/graphql';

import { User } from '../models';

@InputType()
export class NewUserInput extends OmitType(User, ['id'], InputType) {}
