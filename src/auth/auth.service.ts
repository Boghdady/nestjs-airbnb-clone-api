import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from '../common/errors-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
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
    return { accessToken };
  }
}
