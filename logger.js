const winston = require("winston");
module.exports = {
  infoLogger: winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({
        filename: "logs/2022-05-09-info.log",
        level: "info",
      }),
    ],
  }),
  errorLogger: winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({
        filename: "logs/2022-05-09-error.log",
        level: "error",
      }),
    ],
  }),
};
