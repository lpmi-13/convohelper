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
  var room = req.query.room;
  console.log(room);
  console.log('signing into room: ' + room);
  res.render('channel', { title : 'ConvoHelper'});
});

//respond to incoming pusher events
router.post('/', function(req, res, next) {
  var socketID = req.body.socketId;
  console.log('message from ' + socketID);
  var content = 'oh hey, what do you think?';
  var room = req.body.room;
  console.log('sending ' + content);
  pusher.trigger(room, 'my_event', {'message': content}, socketID);
});

module.exports = router;
