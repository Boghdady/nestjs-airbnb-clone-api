import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '../common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserDto) {
    // check email duplication
    const existingUserByEmail = await this.userModel.findOne({
      email: body.email,
    });

    if (existingUserByEmail)
      throw new BadRequestException('Email already exists');

    // check phone duplication
    const existingUserByPhoneNumber = await this.userModel.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingUserByPhoneNumber)
      throw new BadRequestException('Phone number already exists');

    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // create user
    await this.userModel.create({
      ...body,
      password: hashedPassword,
    });
  }
}
