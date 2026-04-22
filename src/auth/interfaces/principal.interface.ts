interface CurrentUserData {
  _id: string;
  name: string;
  email: string;
}

export interface IPrincipal {
  user: CurrentUserData;
  role: string;
}
