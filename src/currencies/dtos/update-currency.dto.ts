import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCurrencyDto {
  @ApiPropertyOptional({ description: 'Currency name', example: 'Egyptian Pound' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'ISO currency code', example: 'EGP' })
  @IsOptional()
  @IsString()
  currencyCode?: string;
}
