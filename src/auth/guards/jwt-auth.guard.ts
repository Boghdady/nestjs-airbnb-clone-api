import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { UnAuthorizedException } from '../../common/errors-handling/custom-exceptions/un-authorized.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Roles } from '../../common/constants';
import { UsersService } from '../../users/users.service';
import { SystemAdminsService } from '../../system-admins/system-admins.service';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { SystemAdminResponseDto } from '../../system-admins/dtos/system-admin-response.dto';
import { IPrincipal } from '../interfaces/principal.interface';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

export type RequestWithUser = Request & {
  principal: IPrincipal;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminsService: SystemAdminsService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    // 1) Extract token from the request header
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnAuthorizedException('No token provided');
    }
    // 2) Verify the token
    try {
      // 3) If the token is valid
      const payload: JwtPayload = this.jwtService.verify(token);
      // 4) Build User object
      const currentAccount: IPrincipal = await this.buildCurrentUser(payload);

      // 5) Attach User object to the request
      request.principal = currentAccount;
    } catch (error) {
      this.logger.error(error);
      throw new UnAuthorizedException('Invalid token');
    }

    return true;
  }

  private async buildCurrentUser(payload: JwtPayload): Promise<IPrincipal> {
    let currentAccount: UserResponseDto | SystemAdminResponseDto;
    if (payload.role === Roles.USER) {
      currentAccount = await this.usersService.findOne({ _id: payload.id });
    } else {
      currentAccount = await this.adminsService.findOne({ _id: payload.id });
    }

    return {
      user: {
        _id: currentAccount._id,
        name: currentAccount.name,
        email: currentAccount.email,
      },
      role: payload.role,
    };
  }
}
