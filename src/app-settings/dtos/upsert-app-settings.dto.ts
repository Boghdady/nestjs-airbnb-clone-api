import { IsOptional, Max, Min } from 'class-validator';

export class UpsertAppSettingsDto {
  @IsOptional()
  @Min(0)
  @Max(25)
  vatRate: number;

  @IsOptional()
  @Min(0)
  minPrice: number;
}
