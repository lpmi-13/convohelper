var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var configVars = require('./envVars');

var pusher = new Pusher({
  appId: configVars.app_id,
  key: configVars.app_key,
  secret: configVars.app_secret,
  cluster: 'eu',
  encrypted: true
});

router.get('/', function(req, res, next) {
  console.log('got a get request');
  pusher.trigger('test_channel', 'my_event', {'message': 'responding to get request'});
});

//respond to incoming pusher events
router.post('/', function(req, res, next) {
  var socketID = req.body.socketId;
  console.log('message from ' + socketID);
  var content = req.body.message;
  var room = req.body.room;
  console.log('sending ' + content);
  pusher.trigger(room, 'my_event', {'message': content});
});

module.exports = router;
