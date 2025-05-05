import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { get_duration_in_milliseconds } from 'src/utils/helpers';

@Injectable()
export class TimeTakenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('Tracking Execution Time');
    logger.verbose(`${req.method} ${req.originalUrl} [STARTED]`);

    const start = process.hrtime();

    res.on('finish', () => {
      const duration_in_milliseconds = get_duration_in_milliseconds(start);
      logger.warn(
        `${req.method} ${
          req.originalUrl
        } [FINISHED] ${duration_in_milliseconds.toLocaleString()} ms`,
      );
    });

    res.on('close', () => {
      const duration_in_milliseconds = get_duration_in_milliseconds(start);
      logger.verbose(
        `${req.method} ${
          req.originalUrl
        } [CLOSED] ${duration_in_milliseconds.toLocaleString()} ms`,
      );
    });

    next();
  }
}
