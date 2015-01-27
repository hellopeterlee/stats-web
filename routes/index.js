var express = require('express');
var router = express.Router();
var dailyService = require('../service/daily');

/* GET home page. */
router.get('/', function(req, res) {
    dailyService.getDailyStats(function(stats) {
        res.render('index', { title: '黄金矿工统计后台', stats: stats });
    }, function() {
        res.render('index', { title: '黄金矿工统计后台' });
    });
});

module.exports = router;
