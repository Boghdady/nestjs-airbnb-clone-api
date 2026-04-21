import { Injectable } from '@nestjs/common';
import { SystemAdminRepository } from '../repositories/system-admin.repository';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from '../schemas/system-admin.schema';
import { SystemAdminResponseDto } from '../dtos/system-admin-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindOneSystemAdminUsecase {
  constructor(private readonly systemAdminRepository: SystemAdminRepository) {}

  async execute(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminResponseDto> {
    const systemAdmin = await this.systemAdminRepository.findOne(query);
    return plainToInstance(SystemAdminResponseDto, systemAdmin);
  }
}
