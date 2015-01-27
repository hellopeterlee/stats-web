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

    LoginRecordService.getLoginLogs(startDate, endDate, serverId, function(loginLogs){
        var chartData = {};
        chartData['chart'] = {};
        chartData['chart']['caption'] = '登陆统计';
        chartData['chart']['xAxisName'] = '登陆时间';
        chartData['chart']['yAxisName'] = '登陆人数';
        chartData['chart']['numberPrefix'] = '';
        chartData['data'] = [];
        for(var i = 0; i < loginLogs.length; i++){
            var date = loginLogs[i]['loginHour'];
            var years = date.getFullYear().toString();
            var months = (date.getMonth() + 1).toString();
            var days = date.getDate().toString();
            var hour = date.getHours().toString();
            var resultDate = years + "-" + months + "-" + days + " " + hour;
            chartData['data'].push({'label':resultDate, "value":loginLogs[i]['count']});
        }
        response.render('loginLogs', { title: '登陆统计', results:{resultsHour:loginLogs, chartData: JSON.stringify(chartData), comPort:comPort}});
    })
});

module.exports = router;