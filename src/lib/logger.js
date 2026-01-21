import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level}] ${stack || message}${metaString}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
