var express = require('express'),
	router = express.Router(),
	path = require('path'),
	login = require("/../../models/login/login");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login/index');
});

router.post('/', function(req, res, next) {
	var user {
		username: req.body.username,
		password: req.body.pwd
	}
	login.saveUser(user);
	res.end("Successful submission!");
});

router.get('/index2', function(req, res, next) {
	res.render('login/index2');
});

router.get('/index3', function(req, res, next) {
	res.render('login/index3');
});

module.exports = router;