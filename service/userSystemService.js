var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var UserSystem = statsOrm.import(statsDomainDir + 'UserSystem');

var UserSystemService = function () {
};

UserSystemService.addUser = function (fields, callback) {
    UserSystem
        .findOrCreate({ userId: fields['userId'] }, fields)
        .success(function (userSystem, created) {
            if( !created ){
                UserSystem.update(fields, {'userId': fields['userId']}).success(function (rows) {
                    callback(rows);
                });
            }else{
                callback(userSystem);
            }
        });
//    UserSystem.create(fields).success(function(rows) {
//        callback(rows);
//    });
};

UserSystemService.update = function (obj, callback) {
    UserSystem.update(obj, {'userId': obj.userId}).success(function (rows) {
        callback(rows);
    });
}

UserSystemService.updateUserLevel = function (userId,level,serverId,callback) {
    var newUserSystems = {"serverId":serverId,"ip":"","userId":userId,"money":0,"nickname":"","level":level,"gate": 1,"subgate":1};
    UserSystem
        .findOrCreate({ userId: userId }, newUserSystems)
        .success(function (userSystem, created) {
            if( !created ){
                userSystem.level = level;
                userSystem.serverId = serverId;
                userSystem.save().success(function(){
                    callback(userSystem);
                });
            }else{
                callback(userSystem);
            }
        });
}

UserSystemService.updateUserGate = function (userId,gate,subgate,serverId,callback) {
    var newUserSystems = {"serverId":serverId,"ip":"","userId":userId,"money":0,"nickname":"","level":1,"gate": gate,"subgate":subgate};
    UserSystem
        .findOrCreate({ userId: userId }, newUserSystems)
        .success(function (userSystem, created) {
            var oldGate = userSystem.gate;
            var oldSubgate = userSystem.subgate;
            var _oldgate = (oldGate - 1) * 20 + oldSubgate;
            if( !created ){
                userSystem.gate = Math.max(gate,oldGate);
                userSystem.subgate = Math.max(subgate,oldSubgate);
                userSystem.serverId = serverId;
                var _newgate = (userSystem.gate - 1) * 20 + userSystem.subgate;
                userSystem.save().success(function(){
                    callback(_oldgate,_newgate);
                });
            }else{
                callback(0,_oldgate);
            }
        });
}



UserSystemService.showRegisterHour = function (startTime, endTime, serverId, callback) {
    if (serverId === undefined || serverId === null) {
        serverId = 'serverId';
    }
    statsOrm.query("select *,count(*) as count,count(distinct(ip)) as ipCount, date_add(date(createTime),interval hour(createTime) hour) as date from UserSystems where createTime between '" + startTime + "' and '" + endTime + "' and serverId = " + serverId + " group by date_add(date(createTime),interval hour(createTime) hour) order by createTime").success(function (rows) {
        callback(rows);
    });
}

UserSystemService.groupUserLevelCount = function(resultCB){
    statsOrm.query("SELECT level, count( level ) AS _count FROM UserSystems WHERE level IS NOT NULL GROUP BY level asc limit 0,20")
        .success(function (rows) {
            resultCB(rows);
        });
}

module.exports = UserSystemService;
