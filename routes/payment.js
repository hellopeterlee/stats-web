var Async = require('async');
var express = require('express');
var router = express.Router();
var operationService = require('../service/operationService');

/* GET users listing. */
router.get('/', function (req, res) {
    var fnGetPayedUserTotal = function (callback) {
        operationService.getPayedUserTotal(function (count) {
                callback(null, count);
            },
            function () {
                callback('getPayedUserTotal');
            });
    };
    var fnGetPayedByHour = function (i) {
        return function (callback) {
            operationService.getPayedByHour(new Date(), i,
                function (count) {
                    callback(null, count);
                },
                function () {
                    callback('getPayedByHour');
                });
        }
    };
    var fnGetUsersPayed = function (callback) {
        operationService.getUsersPayed(function (operations) {
                callback(null, operations);
            },
            function () {
                callback('getUsersPayed');
            });
    };

    var fnAysncs = [];
    fnAysncs.push(fnGetPayedUserTotal);
    for(var i = 0; i < 24; i++) {
        fnAysncs.push(fnGetPayedByHour(i));
    }
    fnAysncs.push(fnGetUsersPayed);
    Async.parallel(
        fnAysncs,
        function (err, results) {
            if(err) {
                res.render('payment', { title: '充值人数统计' });
            } else {
                console.log(results)
                res.render('payment', { title: '充值人数统计', results: results});
            }
        });
});

module.exports = router;
