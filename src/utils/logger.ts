import winston, { format } from "winston";
const { combine, colorize, timestamp, printf, json } = format;

const devFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const loggerConfig =
  process.env.NODE_ENV === "production"
    ? {
        level: process.env.LOG_LEVEL,
        format: combine(timestamp(), json()),
        defaultMeta: { service: "typescript-graphql-reference" },
        transports: [new winston.transports.Console()],
      }
    : {
        level: process.env.LOG_LEVEL,
        format: combine(colorize(), timestamp(), devFormat),
        transports: [new winston.transports.Console()],
      };

export const logger = winston.createLogger(loggerConfig);
