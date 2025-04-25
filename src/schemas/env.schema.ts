import * as Joi from 'joi';

export const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'qa')
    .default('development'),
  PORT: Joi.number().port().default(3001),
  DB_HOST: Joi.string(),
  DB_USER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
});
