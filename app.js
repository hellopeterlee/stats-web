var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var multer  = require('multer');
var http = require('http');
var querystring = require('querystring');
var urlm = require('url');
var port = require('../../shared/Config')

//var routes = require('./routes/index');
var users = require('./routes/users');
//var payment = require('./routes/payment');
var alive = require('./routes/alive');
var email = require('./routes/email');
var online = require('./routes/online');
var onlineDuration = require('./routes/onlineDuration');
var login = require('./routes/login');
var notice = require('./routes/notice');
var gift = require('./routes/gift');
var announcement = require('./routes/announcement');
var adminUser = require('./routes/AdminUser');
var register = require('./routes/register');

var handleClient = require('./routes/handleClient');
var clientbehaviours = require('./routes/clientbehaviours');
var pushmsg = require('./routes/pushmsg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser('fuckfuckfuckyou'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true, // (default: true)
    resave: true // (default: true)
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: './public/clientupdate/'}));


//app.use('/payment', payment);
//app.use('/', routes);

/* test delete start  */
app.use('/users', users);
app.use('/alive', alive);
app.use('/online', online);
app.use('/onlineDuration', onlineDuration);
app.use('/loginLogs', login);
app.use('/register', register);
app.use('/admin', adminUser);
app.use('/email', email);
app.use('/clientbehaviours', clientbehaviours);
app.use('/pushmsg', pushmsg);

app.use('/login', function(req,res){
    res.render('adminlogin');
});
/* test delete end  */

app.use(function(req, res, next) {
    var login = req.session.adminusername;
    var userId = req.session.userId;
    var url = req.originalUrl;
    //console.log('current>>>>>>>>>>>>>'+url);
    if (url != "/login" && url != '/adminUser/postlogin' && !req.session.adminusername && !querystring.parse(urlm.parse(req.url).query)['protocol']) {
        return res.redirect("/login");
    }
    next();
});

app.use('', handleClient);
/* test delete start  */
app.use('/notice', notice);
app.use('/gift', gift);
app.use('/announcement', announcement);
app.use('/adminUser', adminUser);
/* test delete end  */


//app.use(function(req, res, next) {
//    var auth;
//    if (req.headers.authorization) {
//        auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
//    }
//    if (!auth || auth[0] !== 'handplay' || auth[1] !== 'handplay.com') {
//        res.statusCode = 401;
//        res.setHeader('WWW-Authenticate', 'Basic realm="handplay"');
//        res.end('Unauthorized');
//    } else {
//        next();
//    }
//});

app.set('port', process.env.PORT || 9201);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//http.createServer(app).listen(app.get('port'), function(){
//    console.log('Express server listening on port ' + app.get('port'));
//});

var runLaterTask = function(){
    laterTask.runTasks();
}

http.createServer(app).listen(port.gmWeb.localPort, function(){
    console.log('Express server listening on port ' + 9201);
});

http.createServer(app).listen(port.gmWeb.port, function(){
    console.log('Express server listening on port ' + 10200);
});

var laterTask = require('./tasks/main');

module.exports = app;
