import { Roles } from '../../common/constants';

export interface CurrentUserData {
  _id: string;
  name: string;
  email: string;
}

export interface IPrincipal {
  user: CurrentUserData;
  role: Roles;
}
