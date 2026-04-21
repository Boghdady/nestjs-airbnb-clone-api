import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CountryIdDto {
  @ApiProperty({ description: 'Country MongoDB ID', example: '60d21b4967d0d8992e610c85' })
  @IsNotEmpty()
  @IsMongoId({ message: 'Param must be a valid mongo id' })
  id: string;
}
