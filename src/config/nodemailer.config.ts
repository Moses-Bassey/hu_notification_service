import { registerAs } from '@nestjs/config';
import { string_to_boolean } from 'src/utils/helpers';

const {
  MAIL_DEBUG,
  MAIL_LOGGER,
  MAIL_DISPLAY_NAME,
  MAIL_HOST,
  MAIL_SERVICE,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_NO_REPLY_USERNAME,
  MAIL_NO_REPLY_PASSWORD,
  MAIL_USERNAME,
  MAIL_PASSWORD,
} = process.env;

export const get_mail_display_name = () => MAIL_DISPLAY_NAME;
export const get_mail_no_reply = () => MAIL_NO_REPLY_USERNAME ?? 'no-reply@syncventory.co';
export const get_mail_normal = () => MAIL_USERNAME ?? 'syncventory@syncventory.co';

export const get_mail_debug = (): boolean => string_to_boolean(MAIL_DEBUG);
export const get_mail_logger = (): boolean => string_to_boolean(MAIL_LOGGER);
export const get_mail_secure = (): boolean => string_to_boolean(MAIL_SECURE);

export const get_nodemailer_config = () => ({
  useFactory: () => {
    const config = {
      host: MAIL_HOST,
      service: MAIL_SERVICE ?? 'gmail',
      debug: get_mail_debug() ?? true,
      logger: get_mail_logger() ?? true,
      port: Number.parseInt(MAIL_PORT) ?? 465,
      tls: {
        rejectUnauthorized: false,
      },
      secure: get_mail_secure() ?? true,
    };

    return {
      transport: {
        ...config,
        auth: {
          user: MAIL_USERNAME,
          pass: MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"${get_mail_display_name()}" <${get_mail_normal()}>`,
      },
      noReplyTransport: {
        ...config,
        auth: {
          user: MAIL_NO_REPLY_USERNAME,
          pass: MAIL_NO_REPLY_PASSWORD,
        },
      },
      noReplyDefaults: {
        from: `"${get_mail_display_name()}" <${get_mail_no_reply()}>`,
      },
    };
  },
});

export default registerAs('nodemailer', get_nodemailer_config);
