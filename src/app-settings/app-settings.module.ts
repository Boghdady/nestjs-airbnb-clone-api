import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettingsSchema } from './schemas/app-settings.schema';
import { ModelNames } from '../common/data-access';
import { AppSettingsRepository } from './repositories/app-settings.repository';
import { UpsertAppSettingsUseCase } from './usecases/upsert-app-settings.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: AppSettingsSchema,
        name: ModelNames.APP_SETTINGS,
      },
    ]),
  ],
  providers: [
    AppSettingsService,
    AppSettingsRepository,
    UpsertAppSettingsUseCase,
  ],
  controllers: [AppSettingsController],
})
export class AppSettingsModule {}
