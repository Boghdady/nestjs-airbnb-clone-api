import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './usecases/upsert-app-settings.usecase';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';

@Injectable()
export class AppSettingsService {
  constructor(
    private readonly upsertAppSettingsUseCase: UpsertAppSettingsUseCase,
  ) {}

  async upsert(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    return this.upsertAppSettingsUseCase.execute(body);
  }
}
