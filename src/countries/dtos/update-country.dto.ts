import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiPropertyOptional({ description: 'Country name', example: 'Egypt' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'ISO country code', example: 'EG' })
  @IsOptional()
  @IsString()
  countryCode?: string;
}
