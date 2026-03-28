import { EnvironmentInterface } from '../environment.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): EnvironmentInterface => ({
  ...defaultEnv(),
  refreshTokenExpireIn: '30d',
  // add production-specific env, override default env
  // port: 6000,
  // email
});
