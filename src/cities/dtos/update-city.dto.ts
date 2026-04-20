import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  country: string;
}
