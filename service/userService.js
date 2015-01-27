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
//var UserService = function(){};
//
//UserService.findById = function(userId,resultCB){
//    UserRole.find({where:{'userId':userId}}).success(function(role){
//        resultCB(role);
//    });
//}
//
//UserService.findByNickName = function(nickName,resultCB){
//    UserRole.find({where:{'nickname':nickName}}).success(function(role){
//        resultCB(role);
//    });
//}
//
//UserService.findAndCountAll = function(resultCB, response){
//    GameUser.findAndCountAll({where:['loginTime>UNIX_TIMESTAMP(now())*1000 - 3600*1000']}).success(function(roles){
//        resultCB(roles,response);
//    });
//}
//
//UserService.updateRole = function(obj,resultCB,response){
//    UserRole.update(obj, {'id':obj.id}).success(function(row){
//        resultCB(row, response);
//    });
//}
//
//
//module.exports = UserService;