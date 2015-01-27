var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var Gift = statsOrm.import(statsDomainDir + 'Gift');
var request = require('request');
var comPort = require('../../../shared/Config').comPort;
var toolParameter = require('../../../shared/Config').toolParameter;
var myUtil = require('../utils/util.js');
var myNetwork = require('../../common/network');
var async = require('async');
var _ = require('lodash');

var GiftService = function () {
};

GiftService.findAll = function (callback) {
    Gift.findAll().success(function (gifts) {
        callback(gifts);
    });
}

GiftService.findById = function (id, callback) {
    statsOrm.query("select * from Gifts where id = " + id).success(function (gifts) {
        callback(gifts);
    });
}

//GiftService.update_ = function (obj, callback) {
//    for(var i = 0; i < toolParameter.length; i++){
//        if(toolParameter[i].name === obj.goodsname){
//            var goodsSend = [];
//            for(var j = 0; j < toolParameter.length; j++){
//                if(toolParameter[j].name === obj.goodsname2){
//                    var goodsId2 = toolParameter[j].id;
//                    var goods2 = {};
//                    goods2.goodsId = goodsId2;
//                    goods2.num = obj.number2;
//                    goodsSend.push(goods2);
//                }
//            }
//            var goodsId = toolParameter[i].id;
//            var id = obj.id;
//            var goods = {};
//            goods.goodsId = goodsId;
//            goods.num = obj.number;
//            goodsSend.push(goods);
//            var good = JSON.stringify(goodsSend);
//            obj.goods = good;
//            Gift.update(obj, {'id': id}).success(function (gifts) {
//                callback(gifts);
//            });
//        }
//    }
//}

GiftService.update = function (obj, callback) {
    obj['goods'] = [];
    if( _.isArray(obj['goodsId']) && _.isArray(obj['number']) && _.size(obj['goodsId']) == _.size(obj['number']) ){
        for( i in obj['goodsId'] ){
            obj['goods'].push({"goodsId" : obj['goodsId'][i] ,"num" : obj['number'][i]});
        }
        obj['goods'] = JSON.stringify(obj['goods']);
    }
    Gift.update(obj, {'id': obj.id}).success(function (gifts) {
        callback(gifts);
    });
}

GiftService.pushGift = function (giftId, resultCB) {
    statsOrm.query("select * from Gifts where id = " + giftId).success(function (result) {
        var gift = result[0];
        if (!gift) {
            resultCB(0);
            return;
        }
        delete gift.sended;
        var count = 0;
        myUtil.logger.info('comPort length:' + comPort.length);
        var msg = {};
        msg.protocol = 27;
        msg.json = gift;
        gift.goods = JSON.parse(gift.goods);

        async.eachSeries(comPort,function(port,next){
            myUtil.logger.info('request push gift:' + JSON.stringify(port));
//          request('http://' + comPort[port].local_ip + ":" + comPort[port].localPort + "?protocol=27&json=" + JSON.stringify(gift), function (error, response, body) {
            myNetwork.httpGet(port.local_ip, port.localPort, msg, function(result) {
                if (result) {
                    myUtil.logger.info('Push gifts success: http://' + port.local_ip + ":" + port.localPort + "?protocol=27&json=" + JSON.stringify(gift));
                    next();
                }
                else {
                    next();
                }
            })
        },function(e){
            if(e){
                resultCB(0);
            }else{
                resultCB(1);
            }
        });
    });
}

module.exports = GiftService;