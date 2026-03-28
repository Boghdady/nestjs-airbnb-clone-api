import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'access token',
    example: 'kjdlkjdlskjkaljlkasdjlkadjlkjas..',
  })
  accessToken: string;

  @ApiProperty({
    description: 'refresh token',
    example: 'kjdlkjdlskjkaljlkasdjlkadjlkjas..',
  })
  refreshToken: string;
}
