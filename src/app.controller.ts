import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateHelloDto } from './dto/create-hello.dto';
import { NotFoundException } from './common/errors-handling/custom-exceptions/not-found.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new NotFoundException('Not Found Hello');
    return this.appService.getHello();
  }

  @Get('/error')
  getHelloError(): string {
    throw new Error('Not Found Hello');
    return this.appService.getHello();
  }

  @Post('/create')
  createHello(@Body() createHello: CreateHelloDto): string {
    console.log(createHello);
    return this.appService.getHello();
  }
}
