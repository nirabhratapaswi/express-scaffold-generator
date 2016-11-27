var mongoose = require('mongoose'),
	Login = require('./model'),
	conn = 'mongodb://localhost:27017/login';

mongoose.connect(conn, function(error) {
	if (error)
		throw error;

	console.log('Successfully connected to MongoDB');
});

function saveUser(user) {
	var newUser = new Login({
		username: user.username,
		password: user.password
	});

	newUser.save(function(error, user) {
		if (error)
			return console.error(error)

		console.log("User saved successfully: " + user.username);
	});
}

function validateUser(userCheck, callback) {
	Login.findOne({
		username: userCheck.username
	}, function(error, user) {
		if (error) {
			console.error(error);
			callback(null, false);
		}

		if (user) {
			user.validatePassword(userCheck.password, function(error, valid) {
				if (error)
					console.error(error);

				console.log(user.username + ", entered password is: " + valid);
				callback(user.username, valid);
			});
		} else {
			callback(null, false);
		}
	});
}

function showall(callback) {
	Login.find(function(error, users) {
		if (error) {
			console.error(error);
			callback(null, false)
		}
		if (users) {
			for (user in users) {
				console.log(users[user].username + " has been read from the database!!");
			}
			callback(users, true);
		}
	});
}

function deleteUser(userCheck, callback) {
	validateUser(userCheck, function(username, valid) {
		console.log("From validate user, returned username: " + username + ", valid parameter: " + valid);
		if(valid) {
			Login.remove({
				username: username
			}, function(error) {
				if(error) {
					console.error(error);
					callback(username, false);
				} else {
					callback(username, true);
				}
			});
		} else {
			callback(username, false);
		}
	});
}

module.exports = {
	saveUser: saveUser,
	validateUser: validateUser,
	showall: showall,
	deleteUser: deleteUser
}
