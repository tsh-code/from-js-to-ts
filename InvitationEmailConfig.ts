import { Joi } from "celebrate";
import { pipeline } from "ts-pipe-compose";

export interface InvitationEmailConfig {
  jwtSecret: string;
}

const loadConfig = (env: any) => ({
    jwtSecret: env.INVITATIOM_EMAIL_JWT
});

const validateConfig = (config: any) => {
  const schema = Joi.object().keys({
    jwtSecret: Joi.string().required()
  });
  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const invitationEmailServiceConfigFactory = pipeline(loadConfig, validateConfig);
