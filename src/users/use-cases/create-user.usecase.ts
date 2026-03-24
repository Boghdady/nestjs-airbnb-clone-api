import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class CreateUserUsecase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(body: CreateUserDto): Promise<UserResponseDto> {
    const existingUserByEmail = await this.userModel.findOne({
      email: body.email,
    });
    if (existingUserByEmail)
      throw new BadRequestException('Email already exists');

    const existingUserByPhoneNumber = await this.userModel.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingUserByPhoneNumber)
      throw new BadRequestException('Phone number already exists');

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createdUser = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

    return plainToInstance(UserResponseDto, createdUser.toObject());
  }
}
