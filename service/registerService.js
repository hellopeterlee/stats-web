var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var UserSystem = statsOrm.import(statsDomainDir + 'UserSystem');

var UserSystemService = function() {};

UserSystemService.addUser = function(fields, callback) {
    UserSystem.create(fields).success(function(rows) {
        callback(rows);
    });
};

UserSystemService.update = function(obj, callback){
    UserSystem.update(obj, {'userId':obj.userId}).success(function(rows){
        callback(rows);
    });
}

UserSystemService.showRegisterDaily = function(obj, callback){
    statsOrm.query("select count(*) as count,date(createTime) as date from UserSystems group by date(createTime)").success(function(rows){
        callback(rows);
    });
}

module.exports = UserSystemService;
