import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID', example: '60d21b4967d0d8992e610c85' })
  @Expose()
  _id: string;

  @ApiProperty({ description: 'User full name', example: 'JOHN DOE' })
  @Expose()
  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @ApiProperty({ description: 'User email address', example: 'john.doe@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'User phone number', example: '0120998088' })
  @Expose()
  phoneNumber: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
