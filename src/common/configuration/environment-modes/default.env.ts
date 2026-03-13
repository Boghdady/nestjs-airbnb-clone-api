import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.PORT) || 3000,
  fullbackLanguage: process.env.FULLBACK_LANGUAGE as string,
  mongodbUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRE_IN as string,
  refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRE_IN as string,
});
