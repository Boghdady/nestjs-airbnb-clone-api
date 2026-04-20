import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { AppSettings } from '../schemas/app-settings.schema';

@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSettings> {
  constructor(
    @InjectModel(ModelNames.APP_SETTINGS)
    private readonly appSettingsModel: Model<HydratedDocument<AppSettings>>,
  ) {
    super(appSettingsModel);
  }
}
