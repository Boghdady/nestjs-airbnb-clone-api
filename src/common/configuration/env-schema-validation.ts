import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  NODE_ENV: joi.string().required(),
});
