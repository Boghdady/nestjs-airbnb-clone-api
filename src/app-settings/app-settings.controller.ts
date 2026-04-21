import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { API_TAGS } from '../common/swagger';
import { FindAppSettingsSwagger, UpsertAppSettingsSwagger } from './swagger';

@ApiTags(API_TAGS.APP_SETTINGS)
@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @UpsertAppSettingsSwagger()
  @Put()
  async upsertAppSettings(
    @Body() body: UpsertAppSettingsDto,
  ): Promise<UpsertAppSettingsDto> {
    return this.appSettingsService.upsert(body);
  }

  @FindAppSettingsSwagger()
  @Get()
  async findAppSettings(): Promise<UpsertAppSettingsDto> {
    return this.appSettingsService.find();
  }
}
