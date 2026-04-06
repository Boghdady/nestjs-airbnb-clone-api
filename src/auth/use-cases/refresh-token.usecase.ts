import { Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ForbiddenException } from '../../common/errors-handling/custom-exceptions/forbidden.exception';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { GenerateTokensUsecase } from './generate-tokens.usecase';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly generateTokensUsecase: GenerateTokensUsecase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(body: RefreshTokenDto): Promise<AuthResponseDto> {
    type RefreshTokenPayload = { userId: string; type: string };
    let decodedToken: RefreshTokenPayload;
    try {
      // verify the refresh token
      decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        body.refreshToken,
      );
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    if (decodedToken.type !== 'refresh')
      throw new BadRequestException('Invalid refresh token');

    // find refresh token from db
    const refreshTokenDoc = await this.refreshTokenRepository.findOne({
      userId: decodedToken.userId,
    });

    if (!refreshTokenDoc) throw new ForbiddenException('Invalid refresh token');

    // compare refresh token with hashed refresh token
    const isRefreshTokenMatched = await bcrypt.compare(
      body.refreshToken,
      refreshTokenDoc.refreshToken,
    );

    if (!isRefreshTokenMatched)
      throw new ForbiddenException('Invalid refresh token');

    // generate new tokens
    const { accessToken, refreshToken } =
      await this.generateTokensUsecase.execute(refreshTokenDoc.userId);

    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
