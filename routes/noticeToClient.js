var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var clientLogService = require('../service/ClientLogService');
//var comPort = require('../../../../shared/Config.js').comPort;
router.get('', function(req, res) {
    var requestData = querystring.parse(url.parse(req.url).query);
    var protocol = requestData['protocol'];
    var info = requestData['json'];
    var clientLog = {};
    clientLog.protocol = protocol;
    clientLog.info = info;
    clientLogService.insert(clientLog, function(){
        res.send({"info":1});
    })
});

module.exports = router;
