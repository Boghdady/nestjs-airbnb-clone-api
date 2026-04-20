import { IsMongoId, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllCitiesDto extends PaginationDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsMongoId()
  country: string;
}
