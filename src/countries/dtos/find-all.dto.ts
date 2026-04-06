import { IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
