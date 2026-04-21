import { ApiProperty } from '@nestjs/swagger';

export class UnitCategoryResponseDto {
  @ApiProperty({ description: 'Unit category ID', example: '60d21b4967d0d8992e610c85' })
  _id: string;

  @ApiProperty({ description: 'Unit category name', example: 'Apartment' })
  name: string;

  @ApiProperty({ description: 'Icon identifier or URL', example: 'fa-building' })
  icon: string;
}
