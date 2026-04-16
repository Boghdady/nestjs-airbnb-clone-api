import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUnitCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
