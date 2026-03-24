import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUsecase } from './use-cases/create-user.usecase';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  async create(body: CreateUserDto) {
    return this.createUserUsecase.execute(body);
  }

  async findOne(query: QueryFilter<User>) {
    return this.userModel.findOne(query);
  }
}
