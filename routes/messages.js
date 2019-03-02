var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var give = require('./giveFloor');

var app_id = process.env.APP_ID; 
var app_key = process.env.APP_KEY;
var app_secret = process.env.APP_SECRET;

var pusher = new Pusher({
  appId: app_id,
  key: app_key,
  secret: app_secret,
  cluster: 'eu',
  encrypted: true
});

router.get('/', function(req, res, next) {
  var room = req.query.room;
  res.render('channel', { title : 'ConvoHelper'});
});

//respond to incoming pusher events
router.post('/', function(req, res, next) {
  var socketID = req.body.socketId;

  var number = Math.floor(Math.random() * give.sentences.length);
  var givingFloor = give.sentences[number];

  var room = req.body.room;
  pusher.trigger(room, 'my_event', {'message': givingFloor}, socketID);
});

module.exports = router;
