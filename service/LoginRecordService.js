var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var LoginRecord = statsOrm.import(statsDomainDir + 'LoginRecord');

var LoginRecordService = function() {};

LoginRecordService.addLoginRecord = function(fields, callback) {
    LoginRecord.create(fields).success(function(rows) {
        callback(rows);
    });
};

LoginRecordService.update = function(obj, callback){
    LoginRecord.update(obj, ' userId = ' + obj.userId + " order by id desc").success(function(rows){
        callback(rows);
    });
}

LoginRecordService.getLoginLogs = function(startTime, endTime, serverId, callback){
    if(serverId === undefined || serverId === null){
        serverId = 'serverId';
    }
    statsOrm.query("select *,count(*) as count,date(loginTime) as date, date_add(date(loginTime),interval hour(loginTime) hour) loginHour from LoginRecords where loginTime between '" + startTime + "' and '" + endTime + "' and serverId = " + serverId + " group by date_add(date(loginTime),interval hour(loginTime) hour) order by loginTime").success(function(rows){
        callback(rows);
    });
}

LoginRecordService.getAlive = function(serverId, callback){
    if(serverId === undefined || serverId === null){
        serverId = 'serverId';
    }
    statsOrm.query("select *,count(*) as count from (select * from LoginRecords where serverId = " + serverId + ") t1,(select * from (select *, date_add(loginTime, interval 7 day) as nextday from LoginRecords where serverId = "+ serverId +" order by loginTime) as m group by userId) m2 where t1.userId = m2.userId and t1.loginTime between t1.loginTime and m2.nextday group by m2.userId").success(function(rows){
        callback(rows);
    });
}

LoginRecordService.getOnline = function(serverId, callback){
    if(serverId === undefined || serverId === null){
        serverId = 'serverId';
    }
    statsOrm.query("select *,count(*) as count from (select * from (select * from LoginRecords where serverId = " + serverId + " order by operationTime desc) as m group by userId) as m2 where m2.operationTime between date_add(now(), interval -10 minute) and now()").success(function(rows){
        callback(rows);
    });
}

LoginRecordService.getEveryOnlineDuration = function(serverId, callback){
    if(serverId === undefined || serverId === null){
        serverId = 'serverId';
    }
    statsOrm.query("select *,sum(duration)/count(*) as durationTime,sum(duration) as sumTime from (select *,time_to_sec(timediff(operationTime,loginTime))/60 as duration from LoginRecords where serverId = " + serverId + " ) as m group by userId").success(function(rows){
        callback(rows);
    });
}

LoginRecordService.getAllOnlineDuration = function(callback){
    statsOrm.query("select *,sum(duration)/count(*) as durationTime,sum(duration) as sumTime from (select *,time_to_sec(timediff(operationTime,loginTime))/60 as duration from LoginRecords) as m group by userId").success(function(rows){
        callback(rows);
    });
}

module.exports = LoginRecordService;
