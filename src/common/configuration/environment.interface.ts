export interface EnvironmentInterface {
  port: number;
  fullbackLanguage: string;
  mongodbUri: string;
  jwtSecret: string;
  accessTokenExpireIn: string;
  refreshTokenExpireIn: string;
}
