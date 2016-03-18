'use strict';
let User = require('../models/User');
let passport = require('passport');
let JwtStrategy = require('passpowrt-jwt').Strategy;
let extractToken = require('passport-jwt').ExtractJwt;
let config = require('config');
let jwt = require('jsonwebtoken');

/**
 * Creates a new user.
 * @param {String} username The user's username.
 * @param {String} email The user's email.
 * @param {String} password The user's password.
 * @returns {User} The user object.
 */
function createUser(username, email, password){
	return User.create({user: username, email, password}).then((user) => user);
}

/**
 * Updates the user's password.
 * @param {SObjectId} uid The user's ID.
 * @param {String} oldPassword The user's old password.
 * @param {String} newPassword The user's new password.
 * @returns {User} The user object.
 */
function updatePassword(uid, oldPassword, newPassword){
	let oldHash = User.hashPassword(oldPassword);
	let newHash = User.hashPassword(newPassword);

	return new Promise((resolve, reject) => User.findById(uid, (err, user) => {
		if (err) {
			return reject(err);
		}

		if (user.password !== oldHash) {
			return reject(new Error('Passwords don\'t match'));
		}

		user.password = newHash;
		return resolve(user.save().then((updatedUser) => updatedUser));
	}));
}

//TODO: create user verification.
//TODO: create user role changing.

/**
 * Gets a user based on it's ID.
 * @param {ObjectId} uid The user's ID.
 * @returns {User} The user data.
 * @trows {Error} DB error.
 */
function findUserById(uid){
	return new Promise((resolve, reject) => User.findById(uid, (err, user) => {
		if (err) {
			return reject(err);
		}

		if (user) {
			return resolve(user);
		}

		return resolve(null);
	}));
}

/**
 * Creates a new token for the user.
 * @param {User} user The user model.
 * @returns {User} The user model.
 * @throws {Error} Token creation error.
 */
function createToken(user){
	//TODO: do token creation.
}

passport.use(new JwtStrategy({jwtFromRequest: extractToken.fromAuthHeader(), secretOrKey: config.get('jwt.secret')}, (payload, done) => {
	findUserById(payload.i).then((user) => done(null, user)).catch((err) => done(err, null));
}));

module.exports = passport.authenticate('jwt', {session: false});