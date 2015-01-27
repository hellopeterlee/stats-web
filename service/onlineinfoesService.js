//var userSystemModuleDir = '../../UserSystem/';
//var userSystemOrm = require(userSystemModuleDir + 'db/orm');
//var userSystemDomainDir = userSystemModuleDir + 'db/domain/';
//var Loginlog = userSystemOrm.import(userSystemDomainDir+"Loginlog"),
//    Onlineinfo = userSystemOrm.import(userSystemDomainDir+"Onlineinfo"),
//    GameUser = userSystemOrm.import(userSystemDomainDir+"User");
//
//var gameModuleDir = '../../';
//var gameOrm = require(gameModuleDir + 'GoldMiner/db/orm');
//var gameDomainDir = gameModuleDir + 'GoldMiner/db/domain/';
//var UserRole = gameOrm.import(gameDomainDir+"Role");
//
//var onlineinfoesService = function(){};
//
//onlineinfoesService.findAll = function(callback, response){
//    Onlineinfo.findAll({order:'id'}).success(function(rows){
//        callback(rows, response);
//    });
//}
//
//module.exports = onlineinfoesService;