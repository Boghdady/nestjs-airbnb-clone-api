import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { QueryFilter } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  async create(body: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUsecase.execute(body);
  }

  async findOne(query: QueryFilter<User>) {
    return this.userRepository.findOne(query);
  }
}
