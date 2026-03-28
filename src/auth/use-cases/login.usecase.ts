import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { GenerateTokensUsecase } from './generate-tokens.usecase';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from '../../users/users.service';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensUsecase: GenerateTokensUsecase,
    private readonly i18nService: I18nService,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
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
    const { refreshToken, accessToken } =
      await this.generateTokensUsecase.execute(user._id.toString());

    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
