import { IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllCitiesDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by city name', example: 'Cairo' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Filter by country ID', example: '60d21b4967d0d8992e610c85' })
  @IsOptional()
  @IsMongoId()
  country: string;
}
