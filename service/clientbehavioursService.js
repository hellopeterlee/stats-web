var fs = require('fs');
var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var Clientbehaviour = statsOrm.import(statsDomainDir + 'Clientbehaviour');

var ClientbehavioursService = function(){};

ClientbehavioursService.findAllByPage = function(pageNum,where,resultCB){
    var _count = 0;
    var result = {};

    var offset = Clientbehaviour.pageOffset(pageNum);
    var limit = Clientbehaviour.pageLimit();

    Clientbehaviour.count().success(function(c) {
//        console.log("There are " + c + " Clientbehaviour!")
        _count = c;
        result['count'] = _count;

        Clientbehaviour.findAll({ where : where, offset: offset, limit: limit ,order: 'id DESC' }).success(function(clientbehaviours){
            result['result'] = clientbehaviours;
            result['offset'] = offset;
            result['limit'] = limit;
            resultCB(result);
        });
    })
}

//var where = "sessionId is not null and sessionId <> 'undefined'";
//ClientbehavioursService.findAllByPage(1,where,function(result){
//    console.log(JSON.stringify(result));
//});

module.exports = ClientbehavioursService;