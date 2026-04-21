import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1, minimum: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page', example: 10, minimum: 1 })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ description: 'Ignore pagination limit and return all results', example: false })
  @IsOptional()
  ignoreLimit?: boolean;
}