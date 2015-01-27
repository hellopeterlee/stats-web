var myUtil = require('../utils/util');
var statOrm = require('../../stat/db/orm');
var PreferredTestQuery = 'SELECT 1';

var IdleConnectionTask = function(){};

IdleConnectionTask.runTask = function(){
    myUtil.logger.info("IdleConnectionTask.runTask start...");
    statOrm.query(PreferredTestQuery).success(function(result){
        myUtil.logger.info("IdleConnectionTestTask.runTask result >>>" + result);
    });
}

module.exports = IdleConnectionTask;