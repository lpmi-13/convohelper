var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var configVars = require('./envVars');
var give = require('./giveFloor');

var app_id = process.env.APP_ID || configVars.app_id;
var app_key = process.env.APP_KEY || configVars.app_key;
var app_secret = process.env.APP_SECRET || configVars.app_secret;

var pusher = new Pusher({
  appId: app_id,
  key: app_key,
  secret: app_secret,
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

  var number = Math.floor(Math.random() * give.sentences.length);
  console.log(number);
  var givingFloor = give.sentences[number];
  console.log(givingFloor);

  var room = req.body.room;
  console.log('sending ' + givingFloor);
  pusher.trigger(room, 'my_event', {'message': givingFloor}, socketID);
});

module.exports = router;
