var statsModuleDir = '../../stat/';
var statsOrm = require(statsModuleDir + 'db/orm');
var statsDomainDir = statsModuleDir + 'db/domain/';
var Email = statsOrm.import(statsDomainDir + 'Email');
var crypto = require('crypto');

var EmailService = function(){};

EmailService.findAll = function(resultCB){
    Email.findAll().success(function(emails){
        resultCB(emails);
    });
}

EmailService.showAllEmails = function(resultCB){
    statsOrm.query("select * from Emails").success(function(emails){
        resultCB(emails);
    });
}

EmailService.updateEmail = function(email, resultCB){
    Email.update(email, {'id': email.id}).success(function(){
        resultCB();
    });
}

EmailService.deleteEmail = function(email, resultCB){
    Email.destroy({id:email.id}).success(function(){
        resultCB();
    });
}

EmailService.addEmail = function(email, resultCB){
    Email.create(email).success(function(){
        resultCB();
    });
}

module.exports = EmailService;
