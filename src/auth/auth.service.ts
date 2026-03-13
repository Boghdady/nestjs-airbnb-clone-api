import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from '../common/errors-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcryptjs';
import { RefreshToken } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnvironmentInterface } from '../common/configuration/environment.interface';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ForbiddenException } from '../common/errors-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async register(body: RegisterDto) {
    const createUserDto: CreateUserDto = { ...body };
    const createdUser = await this.usersService.create(createUserDto);
    return await this.generateTokens(createdUser._id.toString());
  }

  async login(body: LoginDto) {
    // find user by email
    const user = await this.usersService.findOne({ email: body.email });
    if (!user)
      throw new BadRequestException(
        this.i18nService.translate('auth.INVALID_CREDENTIALS'),
      );

    // compare password
    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordMatched)
      throw new BadRequestException(
        this.i18nService.translate('auth.INVALID_CREDENTIALS'),
      );

    // generate tokens
    return await this.generateTokens(user._id.toString());
  }

  private async generateTokens(userId: string) {
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

  async refreshToken(body: RefreshTokenDto) {
    type RefreshTokenPayload = { userId: string; type: string };
    let decodedToken: RefreshTokenPayload;
    try {
      // verify the refresh token
      decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        body.refreshToken,
      );

      if (decodedToken.type !== 'refresh')
        throw new BadRequestException('Invalid refresh token');
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    // find refresh token from db
    const refreshTokenDoc = await this.refreshTokenModel.findOne({
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
    return await this.generateTokens(refreshTokenDoc.userId);
  }
}
