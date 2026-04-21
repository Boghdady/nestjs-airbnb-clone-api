import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  NODE_ENV: joi.string().required(),
  FULLBACK_LANGUAGE: joi.string().default('ar'),
  MONGO_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  ACCESS_TOKEN_EXPIRE_IN: joi.string().default('7d'),
  REFRESH_TOKEN_EXPIRE_IN: joi.string().default('15d'),
  SYSTEM_ADMIN_NAME: joi.string().required(),
  SYSTEM_ADMIN_EMAIL: joi.string().email().required(),
  SYSTEM_ADMIN_PASSWORD: joi.string().required(),
});
