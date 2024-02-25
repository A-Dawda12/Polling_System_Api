const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const moment = require('moment');


//const config = require("config");
const logFormat = winston.format.combine(
    //winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
    info => `${info.timestamp}: ${info.level}: ${info.message}`,
),);

let currentDate = moment().format('YYYY-MM-DD');
let config = {
    "logConfig": {
        "logFolder": ".//logs//",
        "logFile": `AppName-${currentDate}.log`,
        "logLevel" : "debug"
    }
    
}

const transport = new DailyRotateFile({
    filename: config.logConfig.logFolder + config.logConfig.logFile,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '7d',
    prepend: true,
    level: config.logConfig.logLevel,
});
transport.on('rotate', function (oldFilename, newFilename) {

});
const logger = winston.createLogger({
format: logFormat,
transports: [
     transport,
     new winston.transports.Console({
           level: "info",
        //    prettyPrint : true,
        //    colorize    : process.stdout.isTTY,
        //    silent      : false,
        //    timestamp   : false,
        //    json        : false
        }),
]});

module.exports = logger;