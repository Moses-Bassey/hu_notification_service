import { EOL } from 'os';
import { format } from 'util';

import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as FJS from 'fast-json-stringify';
import { isDevelopment } from 'src/utils/environment.utils';

enum LogLevel {
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
}

type LogLevels = keyof typeof LogLevel;

type TracerData = {
  spanId?: string;
  traceId?: string;
};

type LogData = {
  level?: LogLevels;
  message: string | Record<string, any>;
};

type LogMessage = LogData &
  TracerData & {
    context: string;
    time: string;
  };

const { LOG_LEVEL = 'info' } = process.env;

const LOG_LEVEL_COLORS: Record<LogLevels, string> = {
  trace: chalk.gray('TRACE'),
  debug: chalk.white('DEBUG'),
  info: chalk.green('INFO'),
  warn: chalk.yellow('WARN'),
  error: chalk.red('ERROR'),
  fatal: chalk.red('FATAL'),
};

const colorize_log_level = (level: LogLevels): string =>
  LOG_LEVEL_COLORS[level];
const colorize_context = (context?: string): string =>
  context ? ` (${chalk.cyan(context)})` : '';

const stringify = FJS({
  additionalProperties: { nullable: true, type: 'string' },
  properties: {
    contentLength: { nullable: true, type: 'string' },
    context: { nullable: true, type: 'string' },
    ip: { nullable: true, type: 'string' },
    level: { type: 'string' },
    message: { nullable: true, type: 'string' },
    method: { nullable: true, type: 'string' },
    spanId: { nullable: true, type: 'string' },
    statusCode: { nullable: true, type: 'integer' },
    time: { type: 'string' },
    traceId: { nullable: true, type: 'string' },
    url: { nullable: true, type: 'string' },
    userAgent: { nullable: true, type: 'string' },
  },
  type: 'object',
});

export class CustomLogger implements LoggerService {
  context: string | undefined = undefined;

  trace(message: string | Record<string, any>) {
    this.maybeLog({ level: 'trace', message });
  }

  debug(message: string | Record<string, any>) {
    this.maybeLog({ level: 'debug', message });
  }

  info(message: string | Record<string, any>) {
    this.maybeLog({ level: 'info', message });
  }

  log(message: string | Record<string, any>) {
    this.maybeLog({ level: 'info', message });
  }

  warn(message: string | Record<string, any>) {
    this.maybeLog({ level: 'warn', message });
  }

  error(message: string | Record<string, any>) {
    this.maybeLog({ level: 'error', message });
  }

  fatal(message: string | Record<string, any>) {
    this.maybeLog({ level: 'fatal', message });
  }

  private maybeLog({ message, level = 'info' }: LogData) {
    if (LogLevel[level] < LogLevel[LOG_LEVEL]) return;

    const time = new Date().toISOString();

    if (isDevelopment()) {
      const colorized_level = colorize_log_level(level);
      const colorized_context = colorize_context(this.context);

      process.stdout.write(
        `[${time}] ${colorized_level}${colorized_context}: ${format(message)}` +
          EOL,
      );
    } else {
      const data: LogMessage = {
        context: this.context,
        level,
        message: null,
        time,
      };

      if (typeof message === 'string') {
        data.message = message;
      } else {
        Object.assign(data, message);
      }

      process.stdout.write(stringify(data) + EOL);
    }
  }
}
