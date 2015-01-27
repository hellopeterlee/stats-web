var express = require('express');
var router = express.Router();
var myNetwork = require('../../common/network');
var UserService = require('../service/userService');
var comPort = require('../../../shared/Config').comPort;
var product = require('../../../shared/Config').product;
var brand = '用户管理';
var myUtil = require('../../stat/utils/util.js');
var logger = myUtil.logger;
var request = require('request');
var UserSystemService = require('../service/userSystemService');
var gateCountService = require('../service/GateCountService');
var Protocol = require('../../../shared/Protocol');

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('user-input', {title: '角色查询（ID和昵称）和修改', id: 'home', comPort: comPort, product: product});
});


router.post('/user-search', function (req, res) {
    var keyname = req.body['keyname'];
    var channelId = req.body['channelId'];
    var serverId = req.body['serverId'];
    var inputval = req.body['inputval'];

    var asdasd = req.body;
    var msg = {};
    msg.protocol = 30;
    msg.json = {};
    msg.json[keyname] = inputval;

    var cbFailed = function(_res){
        _res.redirect('/users');
    }

    var reqdata = 'http://' + comPort[serverId].local_ip + ":" + comPort[serverId].localPort + "/?protocol="+Protocol.REQUEST_GET_ROLE_INFO+"&json=" +  JSON.stringify({"nickname":inputval})
    console.log("request roleinfo>>"+reqdata);
    request(reqdata,function (error, response, body) {
        if(response){
            try{
                var roleInfo = JSON.parse(response.body);
                console.log(roleInfo.info);

                if( typeof roleInfo.info == 'object'){
                    reqdata = 'http://' + comPort[serverId].local_ip + ":" + comPort[serverId].localPort + "/?protocol="+Protocol.REQUEST_GET_BATTLERECORD+"&json=" +  JSON.stringify({"userId":roleInfo.info.userId})
                    console.log("request battles>>"+reqdata);

                    request(reqdata,function (error, response, body){
                        var battleInfo = JSON.parse(response.body);
                        var battleList = battleInfo.info;
                        if( battleList ){
                            var maxGate = 0;
                            var gate = 1;
                            var subgate = 1;
                            for( var i = 0 ; i < battleList.length ; i++ ){
                                var item = battleList[i];
                                if( typeof item != 'object' ){
                                    item = JSON.parse(item);
                                }
                                var gate = parseInt(item["areaId"]);
                                var subgate = parseInt(item["numId"]);
                                var _gate = gate * 10 + subgate;
                                maxGate = Math.max(maxGate,_gate);
                            }
                            res.render('user-input', {title: '用户资料修改', id: 'home', role: roleInfo.info, comPort: comPort, product: product, serverId:serverId, channelId:channelId , maxGate : maxGate});
                        }else{
                            cbFailed(res);
                        }
                    });
                }else{
                    cbFailed(res);
                    //res.redirect('/users');
                }

            }catch(err) {
                cbFailed(res);
                //res.redirect('/users');
            }
        }
        else{
            cbFailed(res);
            //res.redirect('/users');
        }
    })
});

router.post('/role-save', function (req, res) {
    var serverId = req.body['serverId'];
    var msg = req.body;
    console.log(req.body);
    delete msg.serverId;

    var reqdata = 'http://' + comPort[serverId].local_ip + ":" + comPort[serverId].localPort + "/?protocol=31" + "&json=" +  JSON.stringify(msg);
    console.log(reqdata);
    request(reqdata, function (error, response, body) {
        if(response){
            res.redirect('/users');
            //res.render('user-input', {title: '用户资料修改', id: 'home', role: JSON.parse(response.body).info, comPort: comPort, product: product});
        }
        else{
            res.redirect('/users');
        }
    })

//    myNetwork.httpGet(comPort[serverId - 1].local_ip, comPort[serverId - 1].localPort, msg, function (result) {
//        if (result) {
//
//            //var aaa = {id:1,nickname:"bbb",level:10,money:100,diamond:1000 };
//            response.render('user-input', {title: '用户资料修改', id: 'home', role: result.info, comPort: comPort, product: product});
//
//        }
//        else {
//            response.redirect('/users');
//        }
//    })
});

router.get('/levelcount', function (req, res) {
    UserSystemService.groupUserLevelCount(function(result){
        var chartData = {};
        chartData['chart'] = {};
        chartData['chart']['caption'] = '用户等级统计';
        chartData['chart']['xAxisName'] = '用户等级';
        chartData['chart']['yAxisName'] = '数量';
        chartData['chart']['numberPrefix'] = '';
        chartData['data'] = [];
        for(var i = 0; i < result.length; i++){
            chartData['data'].push({'label':result[i]['level'], "value":result[i]['_count']});
        }
        res.render('userLevelCount', { title: '用户等级统计', chartData: JSON.stringify(chartData)});
    });
});

router.get('/gatecount', function (req, res) {
    var gateCount = 5 * 20;
    var results = {};

    var chartData = {};
    chartData['chart'] = {};
    chartData['chart']['caption'] = '用户过关统计';
    chartData['chart']['xAxisName'] = '用户过关';
    chartData['chart']['yAxisName'] = '数量';
    chartData['chart']['numberPrefix'] = '';
    chartData['data'] = [];

    for(i = 0 ; i < gateCount ; i++){
        results[i+1] = 0;
        chartData['data'].push({'label':(i+1), "value":0});
    }


    gateCountService.findAll(function(result){
        for( i in result){
            var item = result[i];
            var gate = item['gate'];
            var sumcount = item['sumcount'];

            if( gate > 0 ){
                results[gate] = sumcount;
                chartData['data'][gate-1]['value'] = sumcount;
            }
        }

        res.render('userGateCount', { title: '用户过关统计', chartData: JSON.stringify(chartData)});
    });
});


module.exports = router;
