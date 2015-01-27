var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var GateCount = statsOrm.import(statsDomainDir + 'GateCount');

var GateCountService = function () {
};

GateCountService.updateGateCount = function(gate,plus,resultCB){

//    var fnUpdate = function(callback){
//        statsOrm.query("UPDATE GateCounts SET sumcount = sumcount + 1 WHERE gate < " + gate).success(callback());
//    }

    var newGateCount = {"gate":gate,"sumcount":1};
    GateCount
        .findOrCreate({ "gate": gate }, newGateCount)
        .success(function (gateCount, created) {
            if( !created ){
                gateCount.gate = gate;
                gateCount.sumcount += plus;
                gateCount.save().success(function(){
                    resultCB(gateCount);
                });
            }else{
                resultCB(gateCount);
            }
        });
}

GateCountService.findAll = function(resultCB){
    GateCount.findAll().success(function(results){
        resultCB && resultCB(results);
    });
}

module.exports = GateCountService;