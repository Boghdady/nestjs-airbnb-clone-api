import { Injectable } from '@nestjs/common';
import { GenerateTokensUsecase } from './generate-tokens.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { SystemAdminsService } from '../../system-admins/system-admins.service';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginAsSystemAdminUsecase {
  constructor(
    private readonly generateTokensUsecase: GenerateTokensUsecase,
    private readonly systemAdminService: SystemAdminsService,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    // find system by email
    const systemAdmin = await this.systemAdminService.findOne({
      email: loginDto.email,
    });
    if (!systemAdmin) throw new BadRequestException('Invalid credentials');

    // if exists, compare password
    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      systemAdmin.password,
    );
    if (!isPasswordMatched)
      throw new BadRequestException('Invalid credentials');

    // generate tokens
    const { refreshToken, accessToken } =
      await this.generateTokensUsecase.execute({
        id: systemAdmin._id.toString(),
        role: loginDto.role,
      });

    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
