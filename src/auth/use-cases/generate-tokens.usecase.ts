import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../../common/configuration/environment.interface';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class GenerateTokensUsecase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      { payload, type: 'refresh' },
      { expiresIn: this.configService.getOrThrow('refreshTokenExpireIn') },
    );

    // hash the refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // update the refresh token for the userId if not exists create it
    await this.refreshTokenRepository.findOneAndUpdate(
      { userId: payload.id },
      { refreshToken: hashedRefreshToken },
      { returnDocument: 'after', upsert: true },
    );
    return { accessToken, refreshToken };
  }
}
