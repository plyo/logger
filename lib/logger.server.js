import winston from 'winston';
import path from 'path';

/**
 * @fileOverview
 *
 * here is the configs for winston, our logging library
 */

const Console = winston.transports.Console;
const File = winston.transports.File;
const Logger = winston.Logger;

const dirname = path.resolve(path.dirname(require.main.filename), '../logs');

const logger = new Logger({
  transports: [
    new Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'verbose',
      handleExceptions: true,
    }),
    new File({
      name: 'all', // we need to specify names because we have two transports of the same type
      level: 'debug', // default max level is "info", we want to write "verbose" as well
      filename: 'all.log',
      dirname,
      maxsize: 1000000, // 1Mb
      maxFiles: 100,
      tailable: true, // the latest logs are always into `all.log`, older messages go to `all.1.log`, ..., `all.n.log`
      json: false, // it's too hard for human to read json-encoded sql requests
      handleExceptions: true,
    }),
    new File({
      name: 'errors',
      filename: 'errors.log',
      dirname,
      level: 'error', // only errors go here. Useful for quick look on prod env etc.
      maxsize: 1000000, // 1Mb
      maxFiles: 100,
      tailable: true,
      json: false,
      handleExceptions: true,
    }),
  ],
});

export default logger;
