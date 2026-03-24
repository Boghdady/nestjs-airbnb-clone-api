import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUsecase } from './generate-tokens.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensUsecase: GenerateTokensUsecase,
  ) {}

  async execute(body: RegisterDto): Promise<AuthResponseDto> {
    const createUserDto: CreateUserDto = { ...body };

    const createdUser = await this.usersService.create(createUserDto);
    const { accessToken, refreshToken } =
      await this.generateTokensUsecase.execute(createdUser._id.toString());

    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
