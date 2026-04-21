import { Module } from '@nestjs/common';
import { SystemAdminsService } from './system-admins.service';
import { SystemAdminRepository } from './repositories/system-admin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdminSchema } from './schemas/system-admin.schema';
import { ModelNames } from '../common/data-access';
import { InitializeSystemAdminUsecase } from './usecases/initialize-system-admin.usecase';
import { FindOneSystemAdminUsecase } from './usecases/find-one.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: SystemAdminSchema,
        name: ModelNames.SYSTEM_ADMINS,
      },
    ]),
  ],
  providers: [
    SystemAdminsService,
    SystemAdminRepository,
    InitializeSystemAdminUsecase,
    FindOneSystemAdminUsecase,
  ],
  exports: [SystemAdminsService],
})
export class SystemAdminsModule {}
