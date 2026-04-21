import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by currency name', example: 'Egyptian Pound' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Filter by currency code', example: 'EGP' })
  @IsOptional()
  @IsString()
  currencyCode: string;
}
