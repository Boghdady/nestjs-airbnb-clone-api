import { ApiProperty } from '@nestjs/swagger';

export class AppSettingsResponseDto {
  @ApiProperty({ description: 'VAT rate percentage (0-25)', example: 14 })
  vatRate: number;

  @ApiProperty({ description: 'Minimum listing price', example: 100 })
  minPrice: number;
}
