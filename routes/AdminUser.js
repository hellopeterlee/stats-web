var express = require('express');
var router = express.Router();
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var adminUserService = require('../service/AdminUserService');
var comPort = require('../../../shared/Config').comPort;
/* GET home page. */
router.get('/', function(req, res) {
    var result = req.body;
    adminUserService.showAllAdmins(function(adminUsers){
//        for(var i = 0; i < adminUsers.length; i++){
//            adminUsers[i].copyPassword =  adminUsers[i].password;
//            var serverlist = adminUsers[i].serverlist;
//            if(serverlist.length < comPort.length){
//                var longer = comPort.length - serverlist.length;
//                var append = '';
//                for(var j = 0; j < longer; j++){
//                    append += '0';
//                }
//                serverlist += append;
//            }
//            adminUsers[i].copyComPort = serverlist;
//        }
        res.render('admin', { title: '管理员', results:adminUsers});
    });
});

router.post('/updateAdmin', function(req, res) {
    var admin = req.body;
    console.log(admin);
    if(admin.password === admin.copyPassword){
        delete admin.password;
        delete admin.copyPassword;
    }
    adminUserService.updateAdmin(admin, function(){
        res.redirect('/admin');
    });
});

router.post('/deleteAdmin', function(req, res) {
    var admin = req.body;
    delete admin.copyPassword;
    adminUserService.deleteAdmin(admin, function(){
        res.redirect('/admin');
    })
});

router.post('/addAdmin', function(req, res) {
    var admin = req.body;
    adminUserService.addAdmin(admin, function(){
        res.redirect('/admin');
    })
});

router.post('/postlogin',function(req, res){
    var result = req.body;
    adminUserService.checkUserNameAndPassword(req.body['username'],req.body['password'],function(adminuser){
        if(adminuser[0]){
            req.session.adminusername = req.body['username'];
            res.redirect('/announcement');
        }else{
            res.redirect('/login');
        }
    });
});




module.exports = router;
