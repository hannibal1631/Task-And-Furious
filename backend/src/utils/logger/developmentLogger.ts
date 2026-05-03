import * as winston from "winston";

const { format, transports, createLogger } = winston;
const { combine, timestamp, printf, simple } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const developmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      timestamp({ format: "hh:mm:ss" }),
      format.colorize(),
      simple(),
      myFormat
    ),
    // defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
};

export default developmentLogger;
