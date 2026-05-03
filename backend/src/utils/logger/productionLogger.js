import * as winston from "winston";

const { format, transports, createLogger } = winston;
const { combine, timestamp, printf, label, simple } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp} ${message}`;
});

const productionLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), errors({ stack: true }), myFormat),
    // defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console(),
      new transports.File({ filename: "logs/errors.log", level: "error" }),
      new transports.File({ filename: "logs/combined.log", level: "error" }),
    ],
  });
};

export default productionLogger;
