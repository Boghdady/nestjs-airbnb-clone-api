import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    // 1) create user
    const createUserDto: CreateUserDto = { ...body };
    const createdUser = await this.usersService.create(createUserDto);

    // 2) generate token (accessToken, refreshToken)
    const tokens = await this.generateTokens(createdUser._id.toString());

    // 3) return token
    return tokens;
  }

  private async generateTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    return { accessToken };
  }
}
