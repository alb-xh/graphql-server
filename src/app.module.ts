import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';

import {
  User,
  UserServiceEnum,
  UsersModule,
  UsersDataLoader,
  IUsersService,
  USERS_SERVICE_TOKEN,
} from './users';
import {
  Post,
  PostsModule,
  PostServiceEnum,
  PostsDataLoader,
  IPostsService,
  POSTS_SERVICE_TOKEN,
} from './posts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'graphql-db',
      entities: [User, Post],
      synchronize: true,
    }),
    UsersModule.forRoot({
      isGlobal: true,
      service: UserServiceEnum.InMemory,
    }),
    PostsModule.forRoot({
      isGlobal: true,
      service: PostServiceEnum.InMemory,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (
        usersService: IUsersService,
        postsService: IPostsService,
      ) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: () => ({
          usersDataLoader: new UsersDataLoader(usersService),
          postsDataLoader: new PostsDataLoader(postsService),
        }),
      }),
      inject: [USERS_SERVICE_TOKEN, POSTS_SERVICE_TOKEN],
    }),
  ],
})
export class AppModule {}
