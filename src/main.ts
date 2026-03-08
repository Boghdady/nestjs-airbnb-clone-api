import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<EnvironmentInterface>);
  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
  Logger.log(`Server started on port: ${port}`);
}
bootstrap();
