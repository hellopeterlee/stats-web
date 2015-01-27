var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var announcementService = require('../service/announcementService');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('public', { title: '通告发布', results: "1"});
});

router.post('/insert',function(req, res){
    var result = req.body;
    console.log('22222222222222222222222222222222');
    console.log(result);
    announcementService.createAnnouncement(req.body,function(){
        res.redirect('/public');
    });
});

module.exports = router;
