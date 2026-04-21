import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
  @ApiProperty({ description: 'Currency ID', example: '60d21b4967d0d8992e610c85' })
  _id: string;

  @ApiProperty({ description: 'Currency name', example: 'Egyptian Pound' })
  name: string;

  @ApiProperty({ description: 'ISO currency code', example: 'EGP' })
  currencyCode: string;
}
