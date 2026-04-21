import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitializeSystemAdminUsecase } from './usecases/initialize-system-admin.usecase';
import { FindOneSystemAdminUsecase } from './usecases/find-one.usecase';
import { SystemAdmin } from './schemas/system-admin.schema';
import { QueryFilter } from 'mongoose';
import { SystemAdminResponseDto } from './dtos/system-admin-response.dto';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
  constructor(
    private readonly initializeSystemAdminUsecase: InitializeSystemAdminUsecase,
    private readonly findOneSystemAdminUsecase: FindOneSystemAdminUsecase,
  ) {}

  async onModuleInit() {
    await this.initializeSystemAdminUsecase.execute();
  }

  async findOne(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminResponseDto> {
    return this.findOneSystemAdminUsecase.execute(query);
  }
}
