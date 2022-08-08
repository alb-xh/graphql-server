import { Module, DynamicModule, Provider, Type } from '@nestjs/common';

import { USERS_SERVICE_TOKEN, IUsersService } from '../../users';

import { POSTS_OPTIONS_TOKEN, POSTS_SERVICE_TOKEN } from '../constants';
import { InMemoryPostsService } from '../services';
import { PostsResolver } from '../resolvers';
import {
  PostServiceEnum,
  IPostsOptions,
  IPostsOptionsFactory,
  IPostsModuleOptions,
  IPostsModuleOptionsAsync,
} from '../interfaces';

@Module({
  providers: [
    {
      provide: POSTS_SERVICE_TOKEN,
      useFactory: (postOptions: IPostsOptions, usersService: IUsersService) => {
        const { service } = postOptions;

        switch (service) {
          case PostServiceEnum.InMemory: {
            return new InMemoryPostsService(usersService);
          }

          default: {
            throw new Error('Unknown post service!');
          }
        }
      },
      inject: [POSTS_OPTIONS_TOKEN, USERS_SERVICE_TOKEN],
    },
    PostsResolver,
  ],
  exports: [POSTS_SERVICE_TOKEN],
})
export class PostsModule {
  public static forRoot(options: IPostsModuleOptions): DynamicModule {
    const { service } = options;

    return {
      module: PostsModule,
      imports: options.imports,
      global: options.isGlobal,
      providers: [
        {
          provide: POSTS_OPTIONS_TOKEN,
          useValue: { service },
        },
      ],
    };
  }

  public static forRootAsync(options: IPostsModuleOptionsAsync): DynamicModule {
    const asyncProviders = PostsModule.createAsyncProviders(options);

    return {
      module: PostsModule,
      imports: options.imports,
      global: options.isGlobal,
      providers: [...asyncProviders],
    };
  }

  private static createAsyncProviders(
    options: IPostsModuleOptionsAsync,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [PostsModule.createAsyncOptionsProvider(options)];
    }

    return [
      PostsModule.createAsyncOptionsProvider(options),
      {
        provide: options?.useClass as Type<IPostsOptionsFactory>,
        useClass: options.useClass as Type<IPostsOptionsFactory>,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: IPostsModuleOptionsAsync,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: POSTS_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: POSTS_OPTIONS_TOKEN,
      useFactory: async (
        optionsFactory: IPostsOptionsFactory,
      ): Promise<IPostsModuleOptions> =>
        await optionsFactory.createPostsOptions(),
      inject: [
        (options.useClass || options.useExisting) as Type<IPostsOptionsFactory>,
      ],
    };
  }
}
