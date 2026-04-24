import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../common/constants';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestWithUser } from './jwt-auth.guard';
import { ForbiddenException } from '../../common/errors-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const roles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const principal = request.principal;
    const userRole = principal.role;

    const canAccess = roles.includes(userRole);

    if (!canAccess)
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );

    return true;
  }
}
