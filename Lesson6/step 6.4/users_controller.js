var crypto = require('crypto');
var ObjectID = require('mongodb').ObjectID;
var myDB = null;
var users = null;

//Encrypt password
function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

var dbConn = require('./db_connection');
dbConn.getDBConnection(function(currentDB){
	myDB = currentDB;
	users = myDB.collection('users');
});

exports.signup = function(req, res) {
	var user = {
			username: req.body.username,
			hashed_password: hashPW(req.body.password),
			email: req.body.email,
			color: 'unknown'
	};
	
	users.save(user, {w:1}, function(err, results){
		if(err) {
			res.session.error = err;
			res.redirect('/signup');
		} else {
			req.session.userID = user._id;
			req.session.username = user.username;
			req.session.msg = 'Authenticated as ' + user.username;
			res.redirect('/');
		}
	});
};

exports.login = function(req, res) {
	users.findOne({username: req.body.username}, function(err, user){
		if(!user) {
			err = "User not found!!";
		} else if(user.hashed_password === hashPW(req.body.password.toString())) {
			req.session.regenerate(function(){
				req.session.userID = user._id;
				req.session.username = user.username;
				req.session.msg = 'Authenticated as ' + user.username;
				res.redirect('/');
			});
		} else {
			err = "Authentication failed!!";
		}
		
		if(err) {
			req.session.regenerate(function(){
				req.session.msg = err;
				res.redirect('/login');
			});
		}
	});
};

exports.getUserProfile = function(req, res) { 
	users.findOne({_id: new ObjectID(req.session.userID)}, function(err, user){
		if(!user) {
			res.json(404, { err : "User not found!!"});
		} else {
			res.json(user);
		}
	});
};

exports.updateUser = function(req, res) { 
	users.findOne({_id: new ObjectID(req.session.userID)}, function(err, user){
		user.email = req.body.email;
		user.color = req.body.color;
		users.save(user, {w:1}, function(err){
			if(err) {
				res.session.error = err;
			} else {
				req.session.msg = 'User updated!!!';
			}
			res.redirect('/user');
		});
	});
};

exports.deleteUser = function(req, res) { 
	users.findOne({_id: new ObjectID(req.session.userID)}, function(err, user){
		if(user) {
			users.remove({_id: user._id}, function(err) {
				if(err) {
					res.session.msg = err;
				}
				req.session.destroy(function(){
					res.redirect('/login');
				});
			});
		} else {
			res.session.msg = 'User not found!!';
			req.session.destroy(function(){
				res.redirect('/login');
			});
		}
	});
};