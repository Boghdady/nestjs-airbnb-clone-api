import { ApiProperty } from '@nestjs/swagger';

export class CityResponseDto {
  @ApiProperty({ description: 'City ID', example: '60d21b4967d0d8992e610c85' })
  _id: string;

  @ApiProperty({ description: 'City name', example: 'Cairo' })
  name: string;

  @ApiProperty({ description: 'Country ID', example: '60d21b4967d0d8992e610c85' })
  country: string;
}
