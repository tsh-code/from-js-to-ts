import { Joi } from "celebrate";
import { pipeline } from "ts-pipe-compose";

export interface EmailServiceConfig {
  host: string;
  secureConnection: string;
  port: number;
  user: string;
  password: string;
  ciphers: string;
}

const loadConfig = (env: any) => ({
    host: env.MAILER_HOST,
    secureConnection: false,
    port: env.MAILER_PORT,
    user: env.MAILER_USER,
    password: env.MAILER_PASSWORD,
    ciphers: env.MAILER_CIPHERS
});

const validateConfig = (config: any) => {
  const schema = Joi.object().keys({
    host: Joi.string().required(),
    secureConnection: Joi.boolean().required(),
    port: Joi.number().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    ciphers: Joi.string().required(),
  });
  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const emailServiceConfigFactory = pipeline(loadConfig, validateConfig);
