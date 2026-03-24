import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUsecase } from './generate-tokens.usecase';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensUsecase: GenerateTokensUsecase,
  ) {}

  async execute(body: RegisterDto) {
    const createUserDto: CreateUserDto = { ...body };

    const createdUser = await this.usersService.create(createUserDto);
    return await this.generateTokensUsecase.execute(createdUser._id.toString());
  }
}
