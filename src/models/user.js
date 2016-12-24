'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let crypto = require('crypto');
let config = require('config');

/**
 * Hashes and salts a password.
 * @param {String} password The pasword to be hashed.
 * @returns {String} The hashed password in the format: `salt + hash`.
 */
function hashPassword(password){
	let salt = crypto.pseudoRandomBytes(config.get('password.salt')).toString('hex');
	let hash = crypto.pbkdf2Sync(password, salt, config.get('password.iterations'), config.get('password.length') - config.get('password.salt'), config.get('password.digest')).toString('hex');
	return salt + hash;
}

/**
 * Checks if a given password mathes the saved one.
 * @param {String} password The password to check.
 * @returns {Boolean} True if the passwords match, false otherwise.
 * @this User
 */
function checkPassword(password){
	//Have to double the salt's value because it's converting bases from 16 to 32.
	let salt = this.password.slice(0, config.get('password.salt') * 2);
	let hash = this.password.slice(config.get('password.salt') * 2);
	let testHash = crypto.pbkdf2Sync(password, salt, config.get('password.iterations'), config.get('password.length') - config.get('password.salt'), config.get('password.digest')).toString('hex');
	return hash === testHash;
}

/**
 * Finds a user by name.
 * @param {String} name The user's name to search.
 * @param {Function} callback The callback to be passed to the function.
 * @returns {Query} The query for the user.
 * @this User
 */
function findByName(name, callback){
	return this.findOne({name: name}, callback);
}

/**
 * Token definition
 * @typedef {Object} Token
 * @property {String} value The user's current token value.
 * @property {Date} expiration The token's expiration date.
 * @property {Date} creation The token's creation date.
 */
let TokenSchema = new Schema({
	value: String,
	creation: {type: Date, 'default': Date.now, expires: config.get('jwt.expiration')},
	expiration: {type: Date, required: true}
});

//TODO: add token expiration method.

/**
 * User model definition
 * @typedef {Object} User
 * @property {ObjectId} id The user's id.
 * @property {String} name The user's userername.
 * @property {String} role The user's role, one of either: user, verified or admin.
 * @property {String} email The user's email.
 * @property {String} password The user's password.
 * @property {Token} [token] The user's current token.
 */
let UserSchema = new Schema({
	name: {type: String, required: true, unique: true, trim: true, minLength: 5, maxLength: 20, match: /^[a-z0-9\_\-]+$/i},
	role: {type: String, match: /user|admin|verified/, 'default': 'user'},
	//Regexp from: http://stackoverflow.com/a/1373724/937851
	email: {type: String, required: true, unique: true, trim: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i},
	password: {type: String, required: true, select: false, match: /^[^\$\"\'\`\{\}]+$/, set: hashPassword},
	token: TokenSchema
});

UserSchema.method('checkPassword', checkPassword);
UserSchema.static('hashPassword', hashPassword);
/** @this User */
UserSchema.static('findByName', findByName);

module.exports = mongoose.model('User', UserSchema);