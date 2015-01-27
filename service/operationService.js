//var statsModuleDir = '../../stat/';
//var statsOrm = require(statsModuleDir + 'db/orm');
//
//
//
//var OperationService = function() {};
//
//OperationService.getPayedUserTotal = function(cbSuccess, cbFailed) {
//    statsOrm.query('select count(distinct(userId)) as count from Operations'
//    ).success(function(count) {
//        cbSuccess(count);
//    }).failure(function() {
//        cbFailed();
//    });
//};
//
//OperationService.getUsersPayed = function(cbSuccess, cbFailed) {
//    statsOrm.query('select distinct(userId) as userId from Operations'
//    ).success(function(userIds) {
//        cbSuccess(userIds);
//    }).failure(function() {
//        cbFailed();
//    });
//};
//
//OperationService.getPayedByHour = function(date, hour, cbSuccess, cbFailed) {
//    var timeBegin = new Date(date);
//    timeBegin.setHours(hour);
//    timeBegin.setMinutes(0);
//    timeBegin.setSeconds(0);
//    var timeEnd = new Date(date);
//    timeEnd.setHours(hour+1);
//    timeEnd.setMinutes(0);
//    timeEnd.setSeconds(0);
//    Operation.count({where:{createdAt: {between: [timeBegin, timeEnd]}}}).
//        success(function(count) {
//            cbSuccess(count);
//        }).
//        failure(function() {
//            cbFailed();
//        });
//};
//
//
//module.exports = OperationService;
