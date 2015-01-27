var express = require('express');
var router = express.Router();
var PushMsgService = require('../service/pushmsgService');
var querystring = require('querystring');
var moment = require("moment");


router.get('/', function(request, response) {
    var startDate = request.body['startDate'];
    var endDate = request.body['endDate'];

    startDate || (startDate = '0000-01-01');
    endDate || (endDate = '2099-01-01');
    startDate += " 00:00:00";
    endDate += " 23:59:59";

    PushMsgService.getPushMsgs(startDate, endDate, function(rows){
        response.render('pushmsg', { title: '推送消息', results: rows});
    });
});

router.post('/update', function(request, response) {
    var pushMsg = request.body;
    PushMsgService.update(pushMsg, function(result){
        response.redirect('/pushmsg');
    });
});

router.post('/insert', function(request, response) {
    var pushMsg = request.body;
    PushMsgService.insert(pushMsg, function(result){
        response.redirect('/pushmsg');
    });
});

module.exports = router;
