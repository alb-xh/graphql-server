import { ArgsType } from '@nestjs/graphql';

import { PaginationArgs } from '../../common';

@ArgsType()
export class UsersArgs extends PaginationArgs {}
