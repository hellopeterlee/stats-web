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
    LoginRecordService.getAlive(serverId, function(loginLogs){
        var chartData = {};
        chartData['chart'] = {};
        chartData['chart']['caption'] = '留存统计';
        chartData['chart']['xAxisName'] = 'userId';
        chartData['chart']['yAxisName'] = '一周内的登陆次数';
        chartData['chart']['numberPrefix'] = '';
        chartData['data'] = [];
        var countLarge2 = 0;
        var countLarge7 = 0;
        for(var i = 0; i < loginLogs.length; i++){
            if(loginLogs[i].count >=2){
                countLarge2 += 1;
            }
            if(loginLogs[i].count >=7){
                countLarge7 += 1;
            }
            chartData['data'].push({'label':loginLogs[i]['userId'], "value":loginLogs[i]['count']});
        }
        var par2 = countLarge2/(loginLogs.length);
        var par7 = countLarge7/(loginLogs.length);
        response.render('alive', { title: '留存统计', results:{resultsHour:loginLogs, chartData: JSON.stringify(chartData), comPort:comPort, par2:par2, par7:par7}});
    })
});

module.exports = router;