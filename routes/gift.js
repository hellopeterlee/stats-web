var express = require('express');
var router = express.Router();
var giftService = require('../service/GiftService');
var querystring = require('querystring');
var url = require('url');
var myUtil = require('../utils/util.js');
var toolParameter = require('../../../shared/Config').toolParameter;
var _ = require('lodash');

/* GET home page. */
router.get('/', function(request, response) {

    giftService.findAll(function(rows){
        for(var i = 0; i < rows.length; i++){
            rows[i]['goodsItem'] = [];

            var items = JSON.parse(rows[i].goods);

            for(j in items){
                var item = items[j];
                var find = _.find(toolParameter, function(_item) {
                    return _item.id == item['goodsId'];
                });
                item['id'] = find ? find['id'] : -1;
                item['name'] = find ? find['name'] : "未知";

                rows[i]['goodsItem'].push(item);
            }
        }
//        console.log(rows);
//        response.render('gift', { title: '礼物', results: rows, goods: toolParameter, items:goodsItem});
        response.render('gift', { title: '礼物', results: rows, goods: toolParameter});
    });
});

router.post('/changeGift', function(request, response) {
    console.log('111111111111111111111111111111');
    console.log(request.body);
    giftService.update(request.body, function(data){
        response.redirect('/gift');
    });
});

//router.post('/sendGift', function(request, response) {
//    var giftId = request.body.id;
//    giftService.scanWhetherNeedPushGift(giftId, response);
//});

router.post('/sendGift', function(request, response) {
    myUtil.logger.info('sendGift >>............');
    var giftId = request.body.id;
    giftService.pushGift(giftId,function(result){
        if( result == 1 ){
            response.redirect('/gift');
        }else{
            response.redirect('/gift');
        }
    });
});

module.exports = router;
