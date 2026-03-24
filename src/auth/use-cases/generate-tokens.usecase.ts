import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../../common/configuration/environment.interface';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class GenerateTokensUsecase {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    const refreshToken = await this.jwtService.signAsync(
      { userId, type: 'refresh' },
      { expiresIn: this.configService.getOrThrow('refreshTokenExpireIn') },
    );

    // hash the refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // update the refresh token for the userId if not exists create it
    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { refreshToken: hashedRefreshToken },
      { returnDocument: 'after', upsert: true },
    );
    return { accessToken, refreshToken };
  }
}
