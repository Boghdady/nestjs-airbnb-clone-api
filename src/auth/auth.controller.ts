import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignupSwagger } from './swagger/register.swagger';
import { LoginSwagger } from './swagger/login.swagger';
import { RefreshTokenSwagger } from './swagger/refresh-token.swagger';
import { API_TAGS } from '../common/swagger';
import { ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { Public } from './decorators/public.decorator';
import {
  CurrentAccount,
  Principal,
} from './decorators/current-account.decorator';
import { IPrincipal } from './interfaces/principal.interface';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @SignupSwagger()
  @Post('register')
  register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }

  @Public()
  @LoginSwagger()
  @Post('login')
  login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(body);
  }

  @Public()
  @RefreshTokenSwagger()
  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(body);
  }

  @Get('me')
  getMe(@CurrentAccount() principal: Principal) {
    return principal;
  }
}
