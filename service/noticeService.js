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
var Notice = statsOrm.import(statsDomainDir + 'Notice');

var NoticeService = function () {
};

//NoticeService.findAll = function(resultCB, response){
//    notice.findAll().success(function(notices){
//        resultCB(notices, response);
//    });
//}
//
//NoticeService.insert = function(obj, resultCB,response){
//    console.log("11111111111111111111111111111111111111111111111111111111111");
//    console.log(obj.notice);
//    notice.create(obj).success(function(notices){
//        var fileW = __dirname + '/../public/notice.json';
//        fs.writeFileSync(fileW,JSON.stringify(obj));
//        resultCB(notices, response);
//    });
//}


NoticeService.findAll = function (cbSuccess, cbFailed, res) {
    Notice.findAll(
    ).success(function (notices) {
            cbSuccess(notices, res);
        }).failure(function () {
            cbFailed();
        });
};

NoticeService.createNotice = function (fields, resultCB, response) {
    Notice.create(fields).success(function (fields) {

        var fileW = __dirname + '/../public/public.json';
        var publicVersionFile = __dirname + '/../public/publicVersion.txt.txt';

        var publicObj = { title: fields.title, content: fields.content };
        fs.writeFileSync(fileW, JSON.stringify(publicObj));
        fs.writeFileSync(publicVersionFile, fields.version);

        resultCB(fields, response);
    });
}

NoticeService.update = function (obj, callback, response) {
    Notice.update(obj, {'id': obj.id}).success(function (notices) {
        callback(notices, response);
    });
};

NoticeService.findTheNew = function (version, callback) {
    statsOrm.query("select version from Notices order by id desc limit 1").success(
        function (result1) {
            if (version === result1[0].version) {
                callback(0);
            }
            else {
                statsOrm.query("select * from Notices where version = " + result1[0].version).success(function (notices) {
                    callback(notices);
                })
            }
        });
}


module.exports = NoticeService;