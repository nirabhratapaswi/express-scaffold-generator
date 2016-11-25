var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var loginSchema = new Schema({
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	}
});

loginSchema.pre('save', function(next) {
	var user = this;

	//only hash password if not modified or is new
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
		if (error)
			return next(error);

		bcrypt.hash(user.password, salt, function(error, hash) {
			if (error)
				return next(error);

			user.password = hash;
			next();
		});
	});
});

loginSchema.methods.validatePassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(error, valid) {
		if(error)
			return callback(error);
		
		callback(null, valid);
	});
}

module.exports = mongoose.model('Login', loginSchema);
