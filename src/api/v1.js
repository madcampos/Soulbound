/**
 * This is the `API` for the Soulbound project.
 * @restapi
 * @version 1.0
 * @accepts application/json
 * @returns application/json
 */
'use strict';
let router = require('express').Router();

/**
 * Language redirection route.
 * @method all
 * @path /:lang?/:rest+
 * @param {String} [lang=en-US] The language to be used by the API, defaults to `en-US`.
 * @param {String} rest The rest of the path to follow.
 */
function languageRedirection(req, res, next){
	if (!req.params.lang) {
		return res.redirect(`${req.baseUrl.replace(req.params.rest, '')}en-US/${req.params.rest}`);
	}

	if (!(/^[a-z]{2}-[A-Z]{2}/).test(req.params.lang)) {
		return res.redirect(`${req.baseUrl.split(req.params.lang)[0]}${req.params.lang.replace(/[a-z]{2}$/i, (val) => val.toUpperCase())}/${req.params.rest}`);
	}

	return next();
}

//TODO: import authentication!

/**
 * Gets an adventure list given a search string.
 * @method get
 * @path /:lang?/adventure
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {String} s The search string.
 * @param {Boolean} [only=false] If the api is to return only the first result.
 * @param {String} [contents='full'] The contents to return, one of either: `name`, `desc`, `both`, `full`.
 * @param {String} [fields='name'] The fields to include in the search, possible values are: `name`, `tags`, `desc`, `cont`.
 * @returns {Adventure[]} A list with all the adventures matched.
 */
router.get('/:lang?/adventures', languageRedirection, (req, res, next) => {
	//TODO: work search by name, validate and restrain name to a subset?
	//TODO: filter user input
	res.json({});
});

/**
 * Updates a existing adventure given it's id.
 * @method post
 * @path /:lang?/adventure/:id
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {ObjectId} id The adventure's id.
 * @param {Boolean} [status=false] If it's to return only the status of the operation.
 * @returns {Adventure} The modified adventure.
 */
router.post('/:lang?/adventure/:id', languageRedirection, (req, res) => {
	res.json({});
});

/**
 * Gets a existing adventure given it's id.
 * @method get
 * @path /:lang?/adventure/:id
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {ObjectId} id The adventure's id.
 * @param {Boolean} [status=false] If it's to return only the status of the operation.
 * @returns {Adventure} The requested adventure.
 */
router.get('/:lang?/adventure/:id', languageRedirection, (req, res) => {
	res.json({});
});

/**
 * Deletes a existing adventure given it's id.
 * @method delete
 * @path /:lang?/adventure/:id
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {ObjectId} id The adventure's id.
 * @returns {Boolean} The status of the operation.
 */
router.delete('/:lang?/adventure/:id', languageRedirection, (req, res) => {
	res.json({});
});

/**
 * Creates a new adventure.
 * @method put
 * @path /:lang?/adventure/
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {false|ObjectId} [status=false] If it's to return the id if sucessfull or false if unsucessfull.
 * @returns {Adventure} The new adventure.
 */
router.put('/:lang?/adventure', languageRedirection, (req, res) => {
	res.json({});
});

router.use('*', (req, res) => {
	//TODO: propper handle errors
	res.set('Location', `https://${req.hostname}/docs/api/v1`);
	res.status(303).send('This is not the URL you are looking for...');
});

module.exports = router;