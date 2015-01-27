var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var Announcement = statsOrm.import(statsDomainDir + 'Announcement');
var AnnouncementService = function() {};

AnnouncementService.getAnnouncements = function(startDate, endDate, cbSuccess) {
    statsOrm.query("select * from Announcements where anTime between '"+ startDate + "' and '"+ endDate + "'").success(function(rows) {
        cbSuccess(rows);
    });
};

AnnouncementService.update = function(announcement, callback){
    var dayOfWeekArr = announcement['dayOfWeek'];
    var pushRate = announcement['pushRate'];
    var dayOfWeekS = !(typeof dayOfWeekArr === 'string' || dayOfWeekArr === undefined)  ? dayOfWeekArr.join(",") : '';
    var pushRate = pushRate ? pushRate : 999999999;
    announcement['pushRate'] = pushRate;
    announcement['pushDayOfWeek'] = dayOfWeekS;
    announcement['pushType'] = 1 ;
    announcement['nextPushTime'] = announcement['anTime'] ;
    Announcement.update(announcement, {'id':announcement.id}).success(function(result){
        callback(result);
    });
}

AnnouncementService.insert = function(announcement, callback){
    var dayOfWeekArr = announcement['dayOfWeek'];
    var pushRate = announcement['pushRate'];
    var dayOfWeekS = !(typeof dayOfWeekArr === 'string' || dayOfWeekArr === undefined)  ? dayOfWeekArr.join(",") : '';
    var pushRate = pushRate ? pushRate : 999999999;
    announcement['pushRate'] = pushRate;
    announcement['pushDayOfWeek'] = dayOfWeekS;
    announcement['pushType'] = 1 ;
    announcement['nextPushTime'] = announcement['anTime'] ;
    Announcement.create(announcement).success(function(result){
        callback(result);
    });
}

module.exports = AnnouncementService;
