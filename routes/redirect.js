'use strict';
let router = require('express').Router();

/**
 * Redirects to HTTPS.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next method in chain.
 * @returns {Function} the next route.
 */
function redirectHTTPS(req, res, next){
	if (!req.secure) {
		if (req.method === 'GET') {
			return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
		}

		return res.status(403).send('Please use HTTPS when submitting data to this server.');
	}

	return next();
}

/**
 * Redirects urls starting with www to non www version.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next method in chain.
 * @returns {Function} The next route.
 */
function redirectWWW(req, res, next){
	if (/^www\./.test(req.hostname)) {
		return res.redirect(301, `https://${req.hostname.replace(/^www\./, '')}${req.originalUrl}`);
	}

	return next();
}

/**
 * Default 404 catcher.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
function notFound(req, res){
	res.status(404);
	res.set('Content-Type', 'text/html');
	return res.send('<h1>Four, oh, four!</h1>');
}

/**
 * Language redirection method.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next step in the route.
 * @returns {Function} The next route.
 */
function languageRedirection(req, res, next){
	//BCP 47 language regexp based on: http://stackoverflow.com/questions/7035825/regular-expression-for-a-language-tag-as-defined-by-bcp47
	//RegExp $1-$9: 1 = grandfathered (all lower except for: en-GB-oed, sgn-BE-FR, sgn-BE-NL and sgb-CH-DE), 2 = language, 3 = extlang, 4 = script (First uppercase) , 5 = region (uppercase), 6 = variant, 7 = extension, 8 = private use, 9 = private use (x) lang.
	//let langre = /^(?:((?:en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|(?:((?:[A-Za-z]{2,3}(?:-([A-Za-z]{3}(?:-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(?:-([A-Za-z]{4}))?(?:-([A-Za-z]{2}|[0-9]{3}))?(?:-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(?:-([0-9A-WY-Za-wy-z](?:-[A-Za-z0-9]{2,8})+))*(?:-(x(?:-[A-Za-z0-9]{1,8})+))?)|(x(?:-[A-Za-z0-9]{1,8})+))$/i;

	if (!req.params.lang) {
		return res.redirect(`${req.baseUrl}/en-US${req.path}`);
	}

	if (!(/^[a-z]{2}-[A-Z]{2}/).test(req.params.lang)) {
		return res.redirect(`${req.baseUrl}/${req.params.lang.replace(/[a-z]{2}$/i, (val) => val.toUpperCase())}${req.path.replace(/^\/[a-z]{2}-[a-z]{2}/i, '')}`);
	}

	return next();
}

/**
 * Checks the content type of the api.
 * @param {String} contentType The content type to check.
 * @returns {Function} A express middleware.
 */
function checkContent(contentType){
	return (req, res, next) => {
		if (req.get('Content-Type') !== contentType) {
			return res.status(400).send(`Wrong content type, expected: ${contentType}`);
		}

		return next();
	};
}

router.use(redirectHTTPS, redirectWWW);

module.exports = router;
module.exports.notFoundRoute = notFound;
module.exports.languageRedirection = languageRedirection;
module.exports.checkContent = checkContent;