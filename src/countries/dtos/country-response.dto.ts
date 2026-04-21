import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({ description: 'Country ID', example: '60d21b4967d0d8992e610c85' })
  _id: string;

  @ApiProperty({ description: 'Country name', example: 'Egypt' })
  name: string;

  @ApiProperty({ description: 'ISO country code', example: 'EG' })
  countryCode: string;
}
