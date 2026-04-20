import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(body: CreateUserDto): Promise<UserResponseDto> {
    const existingUserByEmail = await this.userRepository.findOne({
      email: body.email,
    });
    if (existingUserByEmail)
      throw new BadRequestException('Email already exists');

    const existingUserByPhoneNumber = await this.userRepository.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingUserByPhoneNumber)
      throw new BadRequestException('Phone number already exists');

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createdUser = await this.userRepository.create({
      ...body,
      password: hashedPassword,
    });

    return plainToInstance(UserResponseDto, createdUser.toObject());
  }
}
