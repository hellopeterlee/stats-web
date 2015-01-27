//var statsModuleDir = '../../stat/';
//var statsOrm = require(statsModuleDir + 'db/orm');
//var statsDomainDir = statsModuleDir + 'db/domain/';
//var DailyStats = statsOrm.import(statsDomainDir + 'StatEveryDay');
//
//var Daily = function() {};
//
////Daily.getDailyStats = function(cbSuccess, cbFailed) {
////    DailyStats.findAll(
////    ).success(function(stats) {
////        cbSuccess(stats);
////    }).failure(function() {
////        cbFailed();
////    });
////};
//
//
//Daily.getDailyStatsByDate = function(startDate, endDate, cbSuccess) {
//    statsOrm.query("select * from stateverydaies where data_at between '"+ startDate + '00' + "'+0 and '"+ endDate + '24' + "'+0").success(function(stats) {
//        cbSuccess(stats);
//    });
//};
//
//module.exports = Daily;
