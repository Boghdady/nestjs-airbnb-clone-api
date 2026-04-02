import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './common/configuration/env-schema-validation';
import configMapping from './common/configuration/config-mapping';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'node:path';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),

    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        fallbackLanguage: configService.getOrThrow('fullbackLanguage'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),

      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        uri: configService.getOrThrow('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
  ],

  providers: [
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class CoreModule {}
