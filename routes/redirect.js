'use strict';
let router = require('express').Router();

/**
 * Redirects to HTTPS.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next method in chain.
 */
function redirectHTTPS(req, res, next){
	if (!req.secure) {
		if (req.method === 'GET') {
			res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
		} else {
			res.status(403).send('Please use HTTPS when submitting data to this server.');
		}
	} else {
		next();
	}
}

/**
 * Redirects urls starting with www to non www version.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next method in chain.
 */
function redirectWWW(req, res, next){
	if (/^www\./.test(req.hostname)) {
		res.redirect(301, `https://${req.hostname.replace(/^www\./, '')}${req.originalUrl}`);
	} else {
		next();
	}
}

router.use(redirectHTTPS, redirectWWW);

module.exports = router;