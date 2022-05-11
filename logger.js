const winston = require("winston");
require("dotenv").config();
const file = process.env.FOLDER;
var regex = /\//g;
const info = new Date().toLocaleDateString().replace(regex, "-") + "info";
console.log("info", info);
const error =
  new Date().toLocaleDateString().replace(regex, "-") + "" + "error";
console.log("error", error);

module.exports = {
  infoLogger: winston.createLogger({
    transports: new winston.transports.File({
      level: "info",
      filename: `${file}/${info}`,
      json: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  }),
  errorLogger: winston.createLogger({
    transports: new winston.transports.File({
      level: "error",
      filename: `${file}/${error}`,
      json: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  }),
};
