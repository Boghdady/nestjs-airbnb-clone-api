import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.PORT) || 3000,
  fullbackLanguage: process.env.FULLBACK_LANGUAGE as string,
  mongodbUri: process.env.MONGO_URI as string,
});
