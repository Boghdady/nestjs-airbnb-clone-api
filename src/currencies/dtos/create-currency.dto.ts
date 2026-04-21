import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @ApiProperty({ description: 'Currency name', example: 'Egyptian Pound' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'ISO currency code', example: 'EGP' })
  @IsOptional()
  @IsString()
  currencyCode?: string;
}
