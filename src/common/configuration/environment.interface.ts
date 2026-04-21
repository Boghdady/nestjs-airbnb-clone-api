export interface EnvironmentInterface {
  port: number;
  fullbackLanguage: string;
  mongodbUri: string;
  jwtSecret: string;
  accessTokenExpireIn: string;
  refreshTokenExpireIn: string;
  systemAdmin: ISystemAdmin;
}

export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}
