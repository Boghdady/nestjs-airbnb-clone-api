import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { UsersController } from './users.controller';
import { ModelNames } from '../common/data-access';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelNames.USERS, schema: UserSchema }]),
  ],
  providers: [UsersService, CreateUserUsecase, UserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
