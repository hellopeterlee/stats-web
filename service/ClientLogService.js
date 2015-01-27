/**
 * Created by Administrator on 2014/10/17.
 */
//var userSystemModuleDir = '../../UserSystem/';
//var userSystemOrm = require(userSystemModuleDir + 'db/orm');
//var userSystemDomainDir = userSystemModuleDir + 'db/domain/';
//var Loginlog = userSystemOrm.import(userSystemDomainDir+"Loginlog"),
//    Onlineinfo = userSystemOrm.import(userSystemDomainDir+"Onlineinfo"),
//    GameUser = userSystemOrm.import(userSystemDomainDir+"User");
//notice = userSystemOrm.import(userSystemDomainDir+"notice");
//
//var gameModuleDir = '../../UserSystem/';
//var gameOrm = require(gameModuleDir + 'db/orm');
//var gameDomainDir = gameModuleDir + 'db/domain/';

var fs = require('fs');
var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var ClientLog = statsOrm.import(statsDomainDir + 'ClientLog');

var ClientLogService = function(){};

ClientLogService.insert = function(clientLog, cbSuccess) {
    ClientLog.create(clientLog).success(function(){
        cbSuccess();
    });
};

module.exports = ClientLogService;