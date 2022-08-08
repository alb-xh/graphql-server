import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserServiceEnum, UsersModule } from './users';
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
