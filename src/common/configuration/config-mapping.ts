import { developmentEnv } from './environment-modes/development.env';
import { stagingEnv } from './environment-modes/staging.env';
import { productionEnv } from './environment-modes/production.env';
import { EnvironmentInterface } from './environment.interface';

const environments: Record<string, () => EnvironmentInterface> = {
  development: developmentEnv,
  staging: stagingEnv,
  production: productionEnv,
};

export default (): EnvironmentInterface => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const getEnvToLoad = environments[nodeEnv] || developmentEnv;

  console.log(`[Configuration] Loading environment: ${nodeEnv}]`);

  return getEnvToLoad();
};
