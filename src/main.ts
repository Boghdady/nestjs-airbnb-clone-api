import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { ConsoleLogger, INestApplication, Logger } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';
import { SwaggerConfig } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    logger: new ConsoleLogger({
      json: process.env.NODE_ENV === 'production',
    }),
  });

  // To use nestjs-i18n in your DTO validation.json
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // setup swagger
  SwaggerConfig.setup(app);

  const configService = app.get(ConfigService<EnvironmentInterface>);
  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
  Logger.log(`Server started on port: ${port}`);
}
bootstrap();
