import { IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;
}
