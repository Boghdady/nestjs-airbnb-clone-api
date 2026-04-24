import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../common/constants';

export const ROLES_KEY = 'roles';
export const Authorize = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
