import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(body: RegisterDto) {
    // 1) create user
    const createUserDto: CreateUserDto = { ...body };
    await this.usersService.create(createUserDto);

    // 2) generate token
    // 3) return token
  }
}
