import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitCategoryDto {
  @ApiProperty({ description: 'Unit category name', example: 'Apartment' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Icon identifier or URL', example: 'fa-building' })
  @IsOptional()
  @IsString()
  icon?: string;
}
