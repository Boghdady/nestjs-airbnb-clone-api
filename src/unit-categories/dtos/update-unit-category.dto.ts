import { IsOptional, IsString } from 'class-validator';

export class UpdateUnitCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
