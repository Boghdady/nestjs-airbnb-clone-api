import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User phone number',
    example: '0120998088',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}
