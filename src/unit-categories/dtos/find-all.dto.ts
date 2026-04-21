import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by unit category name', example: 'Apartment' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Filter by icon', example: 'fa-building' })
  @IsOptional()
  @IsString()
  icon: string;
}
