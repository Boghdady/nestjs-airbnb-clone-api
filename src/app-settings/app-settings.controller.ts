import { Body, Controller, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Put()
  async upsertAppSettings(@Body() body: UpsertAppSettingsDto) {
    return this.appSettingsService.upsert(body);
  }
}
