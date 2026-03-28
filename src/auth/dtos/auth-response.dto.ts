import { Expose } from 'class-transformer';

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}
