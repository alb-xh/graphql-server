import { InputType, OmitType } from '@nestjs/graphql';

import { Post } from '../models';

@InputType()
export class NewPostInput extends OmitType(Post, ['id'], InputType) {}
