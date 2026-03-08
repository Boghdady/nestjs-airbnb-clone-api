import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './common/configuration/env-schema-validation';
import configMapping from './common/configuration/config-mapping';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
