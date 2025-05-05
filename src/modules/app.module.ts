import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from 'dotenv';

import kafka_config from 'src/config/kafka.config';
import security_config from 'src/config/security.config';

import { CommonModule } from 'src/modules/common.module';
import { EmailModule } from 'src/modules/email.module';
import { AuthModule } from 'src/modules/auth.module';
import { NotificationModule } from 'src/modules/notification.module';

import { TimeTakenMiddleware } from 'src/middleware/time-tracker.middleware';

import { get_sequelize_config } from 'src/config/sequelize.config';
import { get_nodemailer_config } from 'src/config/nodemailer.config';
import { WebhookModule } from 'src/modules/webhook.module';
import { LoggerModule } from 'nestjs-pino';
import { isDevelopment, isProduction } from 'src/utils/environment.utils';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { getEventConfig } from 'src/config/events.config';

config();

@Module({
  imports: [
    MailerModule.forRootAsync(get_nodemailer_config()),
    ConfigModule.forRoot({
      load: [
        kafka_config,
        security_config,
      ],
      isGlobal: true,
      cache: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        level: isProduction() ? 'info' : 'debug',
        transport: isDevelopment()
          ? {
              target: 'pino-pretty',
              // options: {
              //   destination: '/var/log/pt_platform_service/app.log', // Log file destination
              //   mkdir: true, // Create the directory if it doesn't exist
              // },
            }
          : undefined,
      },
    }),
    SequelizeModule.forRoot(get_sequelize_config()),
    EventEmitterModule.forRoot(getEventConfig()),
    CommonModule,
    EmailModule,
    NotificationModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TimeTakenMiddleware).forRoutes('/');
  }
}
