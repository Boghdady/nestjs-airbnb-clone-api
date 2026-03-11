import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { CoreModule } from './core.module';

@Module({
  imports: [CoreModule],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule {}
