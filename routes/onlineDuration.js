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
    var serverId = querystring.parse(url.parse(request.url).query)['serverId'];
    LoginRecordService.getEveryOnlineDuration(serverId, function(durations){
        var chartData = {};
        chartData['chart'] = {};
        chartData['chart']['caption'] = '在线时长统计';
        chartData['chart']['xAxisName'] = 'userId';
        chartData['chart']['yAxisName'] = '平均时长(分钟)';
        chartData['chart']['numberPrefix'] = '';
        chartData['data'] = [];
        var allDuration = null;
        for(var i = 0; i < durations.length; i++){
            allDuration += durations[i].sumTime;
            chartData['data'].push({'label':durations[i].userId, "value":durations[i].durationTime});
        }
        var everyDuration = allDuration/(durations.length);

        response.render('onlineDuration', { title: '在线时长统计(分钟)', comPort:comPort, results:durations, chartData: JSON.stringify(chartData), everyDuration:everyDuration});
    })
});

module.exports = router;