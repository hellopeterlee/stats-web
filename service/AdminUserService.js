var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var AdminUser = statsOrm.import(statsDomainDir + 'AdminUser');
var crypto = require('crypto');

var AdminUserService = function(){};

AdminUserService.findAll = function(resultCB){
    AdminUser.findAll().success(function(gifts){
        resultCB(gifts);
    });
}

AdminUserService.showAllAdmins = function(resultCB){
    statsOrm.query("select * from AdminUsers").success(function(adminUsers){
        resultCB(adminUsers);
    });
}

AdminUserService.updateAdmin = function(admin, resultCB){
    if(admin.password){
        var sha1 = crypto.createHash('md5');
        sha1.update(admin.password);
        var pass = sha1.digest('hex');
        admin.password = pass;
    }
    AdminUser.update(admin, {'id': admin.id}).success(function(){
        resultCB();
    });
}

AdminUserService.deleteAdmin = function(admin, resultCB){
    AdminUser.destroy({id:admin.id}).success(function(){
        resultCB();
    });
}

AdminUserService.addAdmin = function(admin, resultCB){
    var sha1 = crypto.createHash('md5');
    sha1.update(admin.password);
    var pass = sha1.digest('hex');
    admin.password = pass;
    AdminUser.create(admin).success(function(){
        resultCB();
    });
}

AdminUserService.checkUserNameAndPassword = function(username,password, resultCB){
    var sha1 = crypto.createHash('md5');
    sha1.update(password);
    var pass = sha1.digest('hex');
    statsOrm.query("select * from AdminUsers where username = '" + username + "' and password = '" + pass + "'").success(function(adminuser){
        resultCB(adminuser);
    });
}



module.exports = AdminUserService;
