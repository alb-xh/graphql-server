import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import {
  UserServiceEnum,
  UsersModule,
  UsersDataLoader,
  IUsersService,
  USERS_SERVICE_TOKEN,
} from './users';
import { PostsModule, PostServiceEnum } from './posts';

@Module({
  imports: [
    UsersModule.forRoot({
      isGlobal: true,
      service: UserServiceEnum.InMemory,
    }),
    PostsModule.forRoot({
      service: PostServiceEnum.InMemory,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (usersService: IUsersService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: () => ({
          usersDataLoader: new UsersDataLoader(usersService),
        }),
      }),
      inject: [USERS_SERVICE_TOKEN],
    }),
  ],
})
export class AppModule {}
