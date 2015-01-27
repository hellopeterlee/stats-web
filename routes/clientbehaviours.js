var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var util = require('util');
var moment = require('moment');
var gameProtocol = require('../../../shared/Protocol');
var ConstServer = require('../../stat/config/ConstServer');
var comPort = require('../../../shared/Config').comPort;
var clientbehavioursService = require('../service/clientbehavioursService');
var myUtil = require("../utils/util");

router.get('/', function (req, res) {
    var page = {limit: ConstServer.PAGE_SIZE, pageNum: 1};
    var where = "sessionId is not null and sessionId <> 'undefined'";
    var pageNum = 1;

    if (req.query.p) {
        pageNum = req.query.p < 1 ? 1 : req.query.p;
        page['pageNum'] = pageNum;
    }

//    var startDate = req.query['startDate'];
//    var endDate = req.query['endDate'];
//    if( moment(startDate).isValid() && moment(startDate).isValid(endDate) ){
//        where['where'] += myUtil.buildDateBetweenStrConditionToday();
//    }

    clientbehavioursService.findAllByPage(pageNum, where,function (result) {
        var resultList = result['result'];
        page.limit = result.limit;

        for( i in resultList ){
            var item = resultList[i];
            item['behavioursObj'] = {};
            var behaviourssObj = item['behavioursObj'] = JSON.parse(item['behaviours']);

            var behavioursfmt = "";
            var timeAt = '';
            var protocol = '';

            for(j in behaviourssObj){
                var behavioursItem = behaviourssObj[j];
                timeAt = behavioursItem['timeAt'];
                protocol = behavioursItem['protocol'];
                if( j > 0 ){
                    behavioursfmt += ",";
                }
                var hint = gameProtocol['hint'][protocol] ? gameProtocol['hint'][protocol] : protocol;
                behavioursfmt += util.format("([%s]:[%s]:%s)",timeAt,protocol,hint);
                behavioursItem['protocolHint'] = hint;
            }

            item['behaviours'] = behavioursfmt;
        }

        var pageCount =   Math.ceil(result.count / page.limit) ;
        page['pageCount'] = pageCount;
        page['size'] = result['result'].length;
        page['numberOf'] = pageCount > 5 ? 5 : pageCount;
        result['page'] = page;
        result['comPort'] = comPort;

        res.render("clientbehaviours", result);
    });
});

module.exports = router;