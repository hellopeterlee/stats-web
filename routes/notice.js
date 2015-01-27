var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var noticeService = require('../service/noticeService');

router.get('/', function(req, res) {

    noticeService.findAll(callback, failed, res);
});

router.post('/update', function(req, res) {
    noticeService.update(req.body, callback2, res);
});

router.post('/insert',function(req, res){
    noticeService.createNotice(req.body,function(){
        res.redirect('/notice');
    });
});

function callback(notices, res){
    res.render('notice', { title: '通告发布', results: notices});
}
function callback2(notices, res){
    noticeService.findAll(callback, failed, res);
}
function failed(){};

module.exports = router;
