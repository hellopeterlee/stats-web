var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var noticeService = require('../service/noticeService');
var userSystemService = require('../service/userSystemService');
var loginRecordService = require('../service/LoginRecordService');
var clientLogService = require('../service/ClientLogService');
var gateCountService = require('../service/GateCountService');
var myUtil = require('../utils/util');
var moment = require('moment');
var gameProtocol = require('../../../shared/Protocol');

router.get('', function (req, res) {
    var reqobj = querystring.parse(url.parse(req.url).query);
//    var json = eval('(' + reqobj['json'] + ')');
    var json = JSON.parse(reqobj['json']);

    var protocol = reqobj.protocol;
    if( isNaN(protocol)  ){
        res.send({"info": -1});
        return;
    }

    var protocol = parseInt(protocol);

    var serverId = reqobj.serverId;
    var sessionId = reqobj['sessionId'];
    var isResponse = reqobj['response'];
    if(json){
       json['response'] = isResponse == "true" ? "1" : "0";
    }

    myUtil.loggerProtocol.info('Request =======>: ' + JSON.stringify(reqobj));
    var todayDate = new Date();
//    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    if (protocol === gameProtocol.REQUEST_NOTICE) {
        var version = json.version;
        noticeService.findTheNew(version, function (notices) {
            myUtil.loggerProtocol.info('=======>Response: ' + JSON.stringify(notices));
            res.send({"info": notices});
        });
    }
    else if (protocol === gameProtocol.REQUEST_CREATE_ROLE) {
        var obj = {ip: json.ip, userId: json.userId, nickname:json.nick,serverId: serverId, createTime: todayDate, money: 0};
//        var obj = {ip: json.ip, userId: json.userId, serverId: serverId, createTime: now, money: 0};
        userSystemService.addUser(obj, function (result) {
            res.send({"info": 1});
        });
    }
    else if (protocol === gameProtocol.REQUEST_CHOOSE_SERVER) { //Protocol.REQUEST_CHOOSE_SERVER
        var loginLog = {userId: json.userId, serverId: serverId, loginTime: todayDate, operationTime: todayDate};
//        var loginLog = {userId: json.userId, serverId: serverId, loginTime: now, operationTime: now};
        loginRecordService.addLoginRecord(loginLog, function (result) {
            res.send({"info": 1});
        });
    }
    else if (protocol === gameProtocol.BATTLE_RECORD_REQUEST || protocol === gameProtocol.REQUEST_COMWIN) {
        if(json && json['userId'] && json['level']){
            var userId = json['userId'];
            var level = json['level'];
            userSystemService.updateUserLevel(userId,level,serverId,function(){
                res.send({"info": 1});
            });
        }
        if(json && json['userId'] && json['z'] && json['s']){
            var gate = json['z'];
            var subgate = json['s'];
            var userId = json['userId'];

            if(isNaN(gate) || isNaN(subgate) || isNaN(userId)){
                res.send({"info": -1});
                return;
            }

            gate = parseInt(gate);
            subgate = parseInt(subgate);
            userId = parseInt(userId);

            if( gate <= 0 || subgate <=1 ){
                res.send({"info": -2});
                return;
            }

            userSystemService.updateUserGate(userId,gate,subgate,serverId,function(oldGate,newGate){
                if( newGate > oldGate ){
                    var _gate = (gate - 1) * 20 + subgate ;
                    gateCountService.updateGateCount(newGate, 1 , function(){
                        gateCountService.updateGateCount(oldGate, -1 , function(){
                            res.send({"info": 1});
                        });
                    });
                }else{
                    res.send({"info": -1});
                }
            });
        }
    }
    else {
        if ( json && json['userId']) {
            var loginLog = {userId: json['userId'], loginTime: todayDate, operationTime: todayDate};
//            var loginLog = {userId: json['userId'], loginTime: todayDate, operationTime: now};
            loginRecordService.update(loginLog, function (result) {
                res.send({"info": 1});
            });
        }
    }

    var clientLog = {"protocol": protocol, "sessionId": sessionId, "info": JSON.stringify(json), "operationTime": todayDate};
//    var clientLog = {"protocol": protocol, "sessionId": sessionId, "info": JSON.stringify(json), "operationTime": now};
        clientLogService.insert(clientLog, function () {
    });

});

module.exports = router;
