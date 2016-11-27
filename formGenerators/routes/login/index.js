var express = require('express'),
	router = express.Router(),
	path = require('path'),
	login = require("../../models/login/login");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login/index');
});

router.get('/showall', function(req, res, next) {
	login.showall(function(users, check) {
		console.log("Showall callback value: " + check);
		res.render('login/showall', {
			users: users
		});
		//res.end("Showall page!!");
	})
});

router.post('/', function(req, res, next) {
	var user = {
		username: req.body.username,
		password: req.body.pwd
	}

	login.validateUser(user, function(username, valid) {
		if (valid) {
			res.end("Valid Password");
		} else {
			res.end("Invalid Password!!");
		}
	});
});

router.get('/new', function(req, res, next) {
	res.render('login/new');
});

router.post('/new', function(req, res, next) {
	var user = {
		username: req.body.username,
		password: req.body.pwd
	}

	login.saveUser(user);
	res.end("User createdn successfully!");
});

router.post('/delete', function(req, res, next) {
	console.log("-------------Delete method called!!--------------");
	var user = {
		username: req.body.username,
		password: req.body.password
	}
	console.log("Username: " + user.username + ", Password: " + user.password);
	login.deleteUser(user, function(username, successfulDeletion) {
		if (successfulDeletion) {
			var respData = {
				confirm: true,
				deletion: "successful",
				username: username
			};
			res.end(JSON.stringify(respData));
		} else {
			var respData = {
				confirm: false,
				deletion: "unsuccessful",
				username: username
			};
			res.end(JSON.stringify(respData));
		}
	});
});

module.exports = router;