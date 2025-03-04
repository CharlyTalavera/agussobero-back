const winston = require("winston")

const logger = winston.createLogger({
    level: "info",
    transports: [
        /* new winston.transports.Console({level: "info"}), */
        new winston.transports.File({filename: "utils/loggers/warn.log", level: "warn"}),
        new winston.transports.File({filename: "utils/loggers/error.log", level: "error"})
    ]
})

module.exports = logger