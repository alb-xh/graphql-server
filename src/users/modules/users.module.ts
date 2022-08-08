import { Module, DynamicModule, Provider, Type } from '@nestjs/common';

import { USERS_OPTIONS_TOKEN, USERS_SERVICE_TOKEN } from '../constants';
import { InMemoryUsersService } from '../services';
import { UsersResolver } from '../resolvers';
import {
  UserServiceEnum,
  IUsersOptions,
  IUsersOptionsFactory,
  IUsersModuleOptions,
  IUsersModuleOptionsAsync,
} from '../interfaces';

@Module({
  providers: [
    {
      provide: USERS_SERVICE_TOKEN,
      useFactory: (userOptions: IUsersOptions) => {
        const { service } = userOptions;

        switch (service) {
          case UserServiceEnum.InMemory: {
            return new InMemoryUsersService();
          }

          default: {
            throw new Error('Unknown user service!');
          }
        }
      },
      inject: [USERS_OPTIONS_TOKEN],
    },
    UsersResolver,
  ],
  exports: [USERS_SERVICE_TOKEN],
})
export class UsersModule {
  public static forRoot(options: IUsersModuleOptions): DynamicModule {
    const { service } = options;

    return {
      module: UsersModule,
      global: options.isGlobal,
      providers: [
        {
          provide: USERS_OPTIONS_TOKEN,
          useValue: { service },
        },
      ],
    };
  }

  public static forRootAsync(options: IUsersModuleOptionsAsync): DynamicModule {
    const asyncProviders = UsersModule.createAsyncProviders(options);

    return {
      module: UsersModule,
      imports: options.imports,
      global: options.isGlobal,
      providers: [...asyncProviders],
    };
  }

  private static createAsyncProviders(
    options: IUsersModuleOptionsAsync,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [UsersModule.createAsyncOptionsProvider(options)];
    }

    return [
      UsersModule.createAsyncOptionsProvider(options),
      {
        provide: options?.useClass as Type<IUsersOptionsFactory>,
        useClass: options.useClass as Type<IUsersOptionsFactory>,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: IUsersModuleOptionsAsync,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: USERS_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: USERS_OPTIONS_TOKEN,
      useFactory: async (
        optionsFactory: IUsersOptionsFactory,
      ): Promise<IUsersModuleOptions> =>
        await optionsFactory.createUsersOptions(),
      inject: [
        (options.useClass || options.useExisting) as Type<IUsersOptionsFactory>,
      ],
    };
  }
}
