import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../common/constants';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'string',
    enum: Roles,
    description: 'actor role',
    example: Roles.USER,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
