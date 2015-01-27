var winston = require('winston');
var moment = require('moment');
require('fs');
var path = require('path');


var logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({level: 'debug'}),
        new winston.transports.File({ filename: path.join(__dirname + '/../log/hope.log'), name: 'file.all', level: 'debug', json: false, colorize: true, maxFiles: 10, maxSize: 1048576, timestamp: function () {
            return moment().format('MMDD HH:mm:ss.SSS');
        } }),
        new winston.transports.File({ filename: path.join(__dirname + '/../log/hope_error.log'), name: 'file.error', handleExceptions: true, level: 'error', json: false, colorize: true, maxFiles: 10, maxSize: 1048576, timestamp: function () {
            return moment().format('MMDD HH:mm:ss.SSS');
        } })
    ]
});

var loggerProtocol = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: path.join(__dirname + '/../log/hope_protocol.log'), name: 'file.all', level: 'debug', json: false, colorize: true, maxFiles: 10, maxSize: 1048576, timestamp: function () {
            return moment().format('MMDD HH:mm:ss.SSS');
        } })
    ]
});

var buildDateBetweenStrConditionToday = function (fieldName, addDay) {
    var start = moment().add(addDay, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    var end = moment().add(addDay, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')

    return  '(' + fieldName + ' between \'' + start + '\' and \'' + end + '\')';
};

module.exports = {
    logger: logger,
    loggerProtocol: loggerProtocol,
    buildDateBetweenStrConditionToday : buildDateBetweenStrConditionToday,
    serverType: function () {
        return process.argv[2] ? process.argv[2] : "test";
    }
};