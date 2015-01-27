var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var PushMsg = statsOrm.import(statsDomainDir + 'PushMsg');

var PushMsgService = function() {};

PushMsgService.getPushMsgs = function(startDate, endDate, cbSuccess) {
    statsOrm.query("select * from PushMsgs where startTime between '"+ startDate + "' and '"+ endDate + "'").success(function(rows) {
        cbSuccess(rows);
    });
};

PushMsgService.update = function(pushMsg, callback){
    var dayOfWeekArr = pushMsg['dayOfWeek'];
    var pushRate = pushMsg['pushRate'];
    var dayOfWeekS = !(typeof dayOfWeekArr === 'string' || dayOfWeekArr === undefined)  ? dayOfWeekArr.join(",") : '';
    var pushRate = pushRate ? pushRate : 999999999;
    pushMsg['pushRate'] = pushRate;
    pushMsg['pushDayOfWeek'] = dayOfWeekS;
    pushMsg['pushType'] = 1 ;
    pushMsg['nextPushTime'] = pushMsg['startTime'] ;
    PushMsg.update(pushMsg, {'id':pushMsg.id}).success(function(result){
        callback(result);
    });
}

PushMsgService.insert = function(pushMsg, callback){
    var dayOfWeekArr = pushMsg['dayOfWeek'];
    var pushRate = pushMsg['pushRate'];
    var dayOfWeekS = !(typeof dayOfWeekArr === 'string' || dayOfWeekArr === undefined)  ? dayOfWeekArr.join(",") : '';
    var pushRate = pushRate ? pushRate : 999999999;
    pushMsg['pushRate'] = pushRate;
    pushMsg['pushDayOfWeek'] = dayOfWeekS;
    pushMsg['pushType'] = 1 ;
    pushMsg['nextPushTime'] = pushMsg['startTime'] ;
    PushMsg.create(pushMsg).success(function(result){
        callback(result);
    });
}

module.exports = PushMsgService;
