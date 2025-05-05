import { registerAs } from '@nestjs/config';

const { SENTRY_DSN, NODE_ENV } = process.env;

export const get_sentry_dsn = () => SENTRY_DSN;

export const get_sentry_config = () => ({
  dsn: get_sentry_dsn(),
  environment: NODE_ENV,
  tracesSampleRate: 1.0,
});

export default registerAs('sentry', get_sentry_config);
