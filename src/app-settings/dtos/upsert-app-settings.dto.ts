import { IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertAppSettingsDto {
  @ApiPropertyOptional({ description: 'VAT rate percentage (0-25)', example: 14, minimum: 0, maximum: 25 })
  @IsOptional()
  @Min(0)
  @Max(25)
  vatRate: number;

  @ApiPropertyOptional({ description: 'Minimum listing price', example: 100, minimum: 0 })
  @IsOptional()
  @Min(0)
  minPrice: number;
}
