/**
 * This is the `API` for users management.
 * @restapi
 * @version 1.0
 * @accepts {JSON} application/json
 * @returns {JSON} application/json
 */

'use strict';
let config = require('config');
let jwt = require('jsonwebtoken');
let t2ms = require('ms');
let router = require('express').Router();
let User = require('../models/User');
let auth = require('./auth');
let checkContent = require('./redirect').checkContent;

router.use(checkContent('application/json'));

/**
 * Filter the user properties to return only basic properties.
 * @param {User} user The user object.
 * @returns {Object} The filtered user.
 */
function filterUser(user){
	return {
		id: user.id,
		name: user.name,
		email: user.email
	};
}

/**
 * Creates a new user.
 * @path /user/new
 * @method put
 * @param {String} name The user's username.
 * @param {String} email The user's email.
 * @param {String} password The user's password.
 * @returns {User|Error} The new user or an error.
 */
router.put('/user/new', (req, res) => {
	return User.create({name: req.body.name, email: req.body.email, password: req.body.password})
	.then((user) => res.json(filterUser(user)))
	.catch((err) => res.status(400).send(err.message));
});

/**
 * Updates the user's password.
 * @path /user/update/password
 * @method post
 * @auth JWTAuth
 * @param {String} oldPassword The user's old password.
 * @param {String} newPassword The user's new password.
 * @returns {User|Error} The updated user or an error.
 */
router.post('/user/update/password', auth, (req, res) => {
	let oldHash = User.hashPassword(req.body.oldPassword);
	let newHash = User.hashPassword(req.body.newPassword);

	//TODO: optimize: the user search is done twice?
	return User.findById(req.user.id, '+password').exec()
	.then((user) => {
		if (user.password !== oldHash) {
			throw new Error('Passwords don\'t match.');
		}

		user.password = newHash;
		return user.save();
	})
	.then((user) => res.json(filterUser(user)))
	.catch((err) => res.status(400).send(err.message));
});

/**
 * Updates the given user info.
 * @path /user/update/:field
 * @method post
 * @auth JWTAuth
 * @param {String} field The field to update.
 * @param {String} value The new value.
 * @returns {User|Error} Returns the modified user or an error.
 */
router.post('/user/update/:field', auth, (req, res) => {
	if (/email|name/.test(req.params.field)) {
		return User.findById(req.user.id).exec()
		.then((user) => {
			user[req.params.field] = req.body.value;
			return user.save();
		})
		.then((user) => res.json(filterUser(user)))
		.catch((err) => res.status(400).send(err.message));
	}

	return res.status(401).send('Unauthorized.');
});

/**
 * Finds a user.
 * @path /user/:id
 * @method get
 * @param {String} id The user's id.
 * @query {Boolean} name Search by name insetead of by id.
 * @returns {User|Error} The user or an error.
 */
router.get('/user/:id', (req, res) => {
	let query;

	if (req.query.name) {
		query = User.findByName(req.params.id);
	} else {
		query = User.findById(req.params.id);
	}

	return query.exec()
	.then((user) => res.json(filterUser(user)))
	.catch((err) => res.status(400).send(err.message));
});

/**
 * Gets the token for the curent user, if any.
 * @path /user/:id/token
 * @method post
 * @param {ObjectId} id The user's id.
 * @param {String} password The user's password.
 */
router.post('/user/:id/token', (req, res) => {
	if (!req.body.password) {
		return res.status(401).send((new Error('Must provide a password.')).message);
	}

	return User.findById(req.params.id, '+password').exec()
	.then((user) => {
		if (!user.checkPassword(req.body.password)) {
			throw new Error('Passwords don\'t match.');
		}

		if (!user.token) {
			return res.json({});
		}

		return res.json(user.token);
	})
	.catch((err) => res.status(400).send(err.message));
});

/**
 * Creates a new token for the user.
 * @path /user/token/create
 * @method put
 * @param {ObjectId} id The user's id.
 * @param {String} password The user's password.
 * @returns {Token|Error} The token created or an error.
 */
router.put('/user/token/create', (req, res) => {
	if (!req.body.password) {
		return res.status(401).send((new Error('Must provide a password.')).message);
	}

	return User.findById(req.body.id, '+password').exec()
	.then((user) => {
		if (!user.checkPassword(req.body.password)) {
			throw new Error('Passwords don\'t match.');
		}

		if (!user.token) {
			let payload = {i: user.id, n: user.name, r: user.role};

			user.token = {
				value: jwt.sign(payload, config.get('jwt.secret'), {expiresIn: config.get('jwt.expiration')}),
				creation: Date.now(),
				expiration: new Date(Date.now() + t2ms(config.get('jwt.expiration')))
			};
		}

		return user.save();
	})
	.then((user) => res.json(user.token))
	.catch((err) => res.status(400).send(err.message));
});

/**
 * Forcefully expires the user's token.
 * @path /user/token/expire
 * @method post
 * @auth JWTAuth
 * @returns {Object|Error} The status of the operation or, if an error occured, the error.
 */
router.post('/user/token/expire', auth, (req, res) => {
	//TODO: optimize: is search done twice?
	return User.findById(req.user.id).exec()
	.then((user) => {
		if (!user.token) {
			throw new Error('The user don\'t have any tokens.');
		}

		if (user.token.value !== req.user.token) {
			throw new Error('Tokens don\'t match.');
		}

		if (user.token.expiration > Date.now()) {
			user.token.expiration = Date.now();
		}

		return user.save();
	})
	.then(() => res.json({status: true}))
	.catch((err) => res.status(400).send(err.message));
});

module.exports = router;