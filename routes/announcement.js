var express = require('express');
var router = express.Router();
var announcementService = require('../service/announcementService');
var querystring = require('querystring');
var url = require('url');
/* GET home page. */
router.get('/', function(request, response) {
    var date = new Date();
    var years = date.getFullYear().toString();
    var months = (date.getMonth() + 1).toString();
    var days = date.getDate().toString();
    var todayDate = years + "-" + months + "-" + days;
    var startDate = querystring.parse(url.parse(request.url).query)['startDate'];
    var endDate = querystring.parse(url.parse(request.url).query)['endDate'];
    if(startDate === undefined || startDate === ''){
        startDate = '0000-01-01 00:00:00';
    }
    else{
        startDate = startDate + ' 00:00:00';
    }
    if(endDate === undefined || endDate === ''){
        endDate = '9999-12-31 23:59:59';
    }
    else{
        endDate = endDate + ' 23:59:59';
    }
    announcementService.getAnnouncements(startDate, endDate, function(rows){
        response.render('announcement', { title: '通告', results: rows});
    });
});

router.post('/update', function(request, response) {
    var announcement = request.body;
    announcementService.update(announcement, function(result){
        response.redirect('/announcement');
    });
});

router.post('/insert', function(request, response) {
    var announcement = request.body;
    announcementService.insert(announcement, function(result){
        response.redirect('/announcement');
    });
});

module.exports = router;
