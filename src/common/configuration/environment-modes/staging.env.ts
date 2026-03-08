import { EnvironmentInterface } from '../environment.interface';
import { defaultEnv } from './default.env';

export const stagingEnv = (): EnvironmentInterface => ({
  ...defaultEnv(),
  // add staging-specific env, override default env
  //port: 5001,
  // email
});
