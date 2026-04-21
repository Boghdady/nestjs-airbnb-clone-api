import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { SystemAdmin } from '../schemas/system-admin.schema';

@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin> {
  constructor(
    @InjectModel(ModelNames.SYSTEM_ADMINS)
    private readonly systemAdminModel: Model<HydratedDocument<SystemAdmin>>,
  ) {
    super(systemAdminModel);
  }
}
