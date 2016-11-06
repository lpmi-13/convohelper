var express = require('express');
var router = express.Router();
var Pusher = require('pusher');
var configVars = require('./envVars');

var pusher = new Pusher({
  appId: configVars.app_id,
  key: configVars.app_key,
  secret: configVars.app_secret
});


/* GET home page. */
router.get('/messages', function(req, res, next) {
  console.log('got message!');
  pusher.trigger('test_channel', 'my_event', {'message': 'hello world'});
  //res.render('message', { title: 'boom' });
});

module.exports = router;
