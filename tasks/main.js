var later = require('later');
var idleConnectionTask = require('./idleConnectionTask');

var sched = later.parse.text('every 1 mins');

var LaterTask = function(){};

later.setInterval(idleConnectionTask.runTask, sched);