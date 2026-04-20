import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../repositories/app-settings.repository';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(): Promise<AppSettingsResponseDto> {
    const appSettings = await this.appSettingsRepository.findOne({});
    return plainToInstance(AppSettingsResponseDto, appSettings);
  }
}
