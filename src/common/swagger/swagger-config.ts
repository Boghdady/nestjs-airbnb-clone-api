import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_TAGS } from './constant';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Airbnb Clone API')
      .setDescription('This is the apis for airbnb clone')
      .setVersion('1.0')
      .addTag(API_TAGS.AUTH)
      .addTag(API_TAGS.USERS)
      .addTag(API_TAGS.COUNTRIES)
      .addTag(API_TAGS.CITIES)
      .addTag(API_TAGS.APP_SETTINGS)
      .addTag(API_TAGS.CURRENCIES)
      .addTag(API_TAGS.UNIT_CATEGORIES)
      .addTag(API_TAGS.SYSTEM_ADMINS)
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory, {
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    });
  }
}
