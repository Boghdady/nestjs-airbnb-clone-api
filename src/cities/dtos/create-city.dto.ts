import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ description: 'City name', example: 'Cairo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Country MongoDB ID', example: '60d21b4967d0d8992e610c85' })
  @IsNotEmpty()
  @IsMongoId()
  country: string;
}
