var mongoose = require('mongoose'),
	Login = require('./model'),
	conn = 'mongodb://localhost:27017/login';

mongoose.connect(conn, function(error) {
	if (error)
		throw error;

	console.log('Successfully connected to MongoDB');
});

/*Login.findOne({
	username: 'user1'
}, function(error, user) {
	if (error)
		return console.error(error);

	user.validatePassword('user1', function(error, valid) {
		if (error)
			console.error(error);

		console.log("user1 : " + valid);
	});

	user.validatePassword('user2', function(error, valid) {
		if (error)
			console.error(error);

		console.log("user2 : " + valid);
	});

});*/

function saveUser(user) {
	var newUser = new Login({
		username: user.username,
		password: user.password
	});

	newUser.save(function(error, user) {
		if(error) 
			return console.error(error)

		console.log("User saved successfully: " + user.username);
	});
}

function validateUser(userCheck, callback) {
	Login.findOne({
		username: userCheck.username
	}, function(error, user) {
		if(error)
			console.error(error);

		user.validatePassword(user.username, function(error, valid) {
			if(error)
				console.error(error);

			console.log(user.username + ", entered password is: " + valid);
			callback(user.username, valid);
		});
	});
}

module.exports = {
	saveUser: saveUser,
	validateUser: validateUser
}
