import { EnvironmentInterface } from '../environment.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): EnvironmentInterface => ({
  ...defaultEnv(),
  // add production-specific env, override default env
  // port: 6000,
  // email
});
