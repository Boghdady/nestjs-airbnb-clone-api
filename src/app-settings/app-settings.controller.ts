import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Put()
  async upsertAppSettings(
    @Body() body: UpsertAppSettingsDto,
  ): Promise<UpsertAppSettingsDto> {
    return this.appSettingsService.upsert(body);
  }

  @Get()
  async findAppSettings(): Promise<UpsertAppSettingsDto> {
    return this.appSettingsService.find();
  }
}
