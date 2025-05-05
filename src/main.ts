import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';

import { AppModule } from 'src/modules/app.module';
import { ValidationFilter } from 'src/filters/validation.filter';
import { ValidationException } from 'src/exception/validation.exception';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

import { get_sentry_config } from 'src/config/sentry.config';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import { CustomLogger } from 'src/loggers/custom.logger';

async function bootstrap() {
  const logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // allows for http-only cookies
  });

  // validation and http Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            error: `${error.property} has wrong value ${error.value}.`,
            message: Object.values(error.constraints).join(''),
          };
        });
        return new ValidationException(messages);
      },
    }),
  );

  // Sentry setup
  Sentry.init(get_sentry_config());
  app.useGlobalInterceptors(new SentryInterceptor());

  try {
    // Staging needs to listen to a specific port that is set in the PORT environment variable
    // To make the server listen on a specific port (e.g. 8080)
    const PORT = process.env.PORT || 3007;
    await app.listen(PORT);
    logger.log(`Starting Notification Service on port ${PORT}.`);
  } catch (e) {
    logger.error(e);

    // NOTE: This does not play nicely with the watcher. The watcher
    // keeps the process open despite calling exit. This seems helpful
    // rather than harmful and for now we should leave it as-is.
    process.exit(1);
  }
}

bootstrap().then();
