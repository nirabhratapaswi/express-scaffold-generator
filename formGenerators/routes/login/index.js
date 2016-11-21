var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/index');
});

router.post('/', function(req, res, next) {
	console.log("Post made!!");
	console.log(req.body.username);
	console.log(req.body.pwd);
	res.end("Successful submission!");
});

router.get('/index2', function(req, res, next) {
  res.render('login/index2');
});

router.get('/index3', function(req, res, next) {
  res.render('login/index3');
});

module.exports = router;
