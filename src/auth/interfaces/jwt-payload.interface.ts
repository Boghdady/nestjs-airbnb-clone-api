import { Roles } from '../../common/constants';

export interface JwtPayload {
  id: string;
  role: Roles;
}
