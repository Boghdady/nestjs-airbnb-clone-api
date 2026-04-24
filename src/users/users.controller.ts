import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/swagger';
import { CreateUserSwagger } from './swagger';

@ApiTags(API_TAGS.USERS)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @CreateUserSwagger()
  // @Post()
  // async create(@Body() body: CreateUserDto) {
  //   return this.usersService.create(body);
  // }
}
