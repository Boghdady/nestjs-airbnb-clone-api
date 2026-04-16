import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon: string;
}
