/**
 * Created by Administrator on 2014/10/11.
 */
var express = require('express');
var router = express.Router();
var async = require('async');
var Daily = require('../service/daily');
var LoginRecordService = require('../service/LoginRecordService');
var querystring = require('querystring');
var url = require('url');
var comPort = require('../../../shared/Config').comPort;

router.get('/', function(request, response) {
    var date = new Date();
    var startDate = querystring.parse(url.parse(request.url).query)['startDate'];
    var endDate = querystring.parse(url.parse(request.url).query)['endDate'];
    var serverId = querystring.parse(url.parse(request.url).query)['serverId'];
    if(startDate === undefined || startDate === ''){
        startDate = '0000-01-01 00:00:00';
    }
    else{
        startDate = startDate + ' 00:00:00';
    }

    if(endDate === undefined || endDate === ''){
        endDate = '9999-12-31 23:23:59';
    }
    else{
        endDate = endDate + ' 23:23:59';
    }

    LoginRecordService.getOnline(serverId, function(online){
        response.render('online', { title: '在线统计', results:online[0].count, comPort:comPort});
    });
});

module.exports = router;