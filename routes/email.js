var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var myNetwork = require('../../common/network');
var emailService = require('../service/EmailService');
var comPort = require('../../../shared/Config').comPort;
var status = require('../../stat/gate/tasks/StatusTask');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res) {
    var result = req.body;
    emailService.showAllEmails(function(emails){
        var msg = {};
        msg.protocol = 26;
        msg.json = {};
        var statusArr = [];
        async.eachSeries(comPort,
            function(port,next){
                myNetwork.httpGet(port.ip, port.port, msg, function(result) {
                    if (result) {
                        statusArr.push(result.info);
                        next();
                    }
                    else{
                        statusArr.push("-2");
                        next();
                    }
                })
            },
            function(e){
                if(e){
                }else{
                    res.render('email', { title: '运维', results:emails, statusArr:statusArr, comPort:comPort});
                }
            })
    });
})

router.post('/updateEmail', function(req, res) {
    var email = req.body;
    emailService.updateEmail(email, function(){
        res.redirect('/email');
    });
});

router.post('/deleteEmail', function(req, res) {
    var email = req.body;
    emailService.deleteEmail(email, function(){
        res.redirect('/email');
    })
});

router.post('/addEmail', function(req, res) {
    var email = req.body;
    emailService.addEmail(email, function(){
        res.redirect('/email');
    })
});

module.exports = router;
