
'use strict';
let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let extractToken = require('passport-jwt').ExtractJwt;
let config = require('config');
let User = require('../models/User');

/**
 * Authenticates a user given it's JWT.
 * @middleware JWTAuth
 * @methods put, post, delete
 * @header {Authentication} The Json Web Token header in the format: `Bearer <JWT...>`.
 * @returns {401} The given token didn't math the user's token.
 */
passport.use(new JwtStrategy({
	jwtFromRequest: extractToken.fromAuthHeaderWithScheme('Bearer'),
	secretOrKey: config.get('jwt.secret')
}, (payload, done) => {
	return User.findById(payload.i).exec()
	.then((user) => done(null, user))
	.catch((err) => done(err, null));
}));

module.exports = passport.authenticate('jwt', {session: false});