import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { Roles } from '../../common/constants';
import { LoginAsUserUsecase } from './login-as-user.usecase';
import { LoginAsSystemAdminUsecase } from './login-as-system-admin.usecase';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly loginAsUserUsecase: LoginAsUserUsecase,
    private readonly loginAsSystemAdminUsecase: LoginAsSystemAdminUsecase,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    if (body.role.includes(Roles.USER)) {
      return this.loginAsUserUsecase.execute(body);
    }
    // login as system admin
    return this.loginAsSystemAdminUsecase.execute(body);
  }
}
