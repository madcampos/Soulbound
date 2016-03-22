/**
 * This is the `API` for the Soulbound project.
 * @restapi
 * @version 1.0
 * @accepts {JSON} application/json
 * @returns {JSON} application/json
 */
'use strict';
let router = require('express').Router();
let auth = require('../../routes/auth');
let lang = require('../../routes/redirect').languageRedirection;
let checkContent = require('../../routes/redirect').checkContent;
let Adventure = require('../../models/Adventure');

router.use(checkContent('application/json'));

/**
 * Gets an adventure list given a search string.
 * @path /:lang?/adventure
 * @method get
 * @use LangRedirect
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @query {String} s The search string.
 * @query {Boolean} [first=false] If the api is to return only the first result.
 * @query {String} [contents='full'] The contents to return, one of either: `name`, `desc`, `both`, `full`.
 * @query {String} [fields='name'] The fields to include in the search, possible values are: `name`, `tags`, `desc`, `cont`.
 * @returns {Adventure[]} A list with all the adventures matched.
 */
router.get('/:lang?/adventures', lang, (req, res, next) => {
	//TODO: work search by name, validate and restrain name to a subset?
	//TODO: filter user input
	res.json({});
});

/**
 * Updates a existing adventure given it's id.
 * @path /:lang?/adventure/:id
 * @method post
 * @use LangRedirect
 * @auth JWTAuth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {ObjectId} id The adventure's id.
 * @param {Boolean} [status=false] If it's to return only the status of the operation.
 * @returns {Adventure} The modified adventure.
 */
router.post('/:lang?/adventure/:id', lang, auth, (req, res) => {
	res.json({});
});

/**
 * Gets a existing adventure given it's id.
 * @path /:lang?/adventure/:id
 * @method get
 * @use LangRedirect
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {ObjectId} id The adventure's id.
 * @query {Boolean} [status=false] If it's to return only the status of the operation.
 * @returns {Adventure} The requested adventure.
 */
router.get('/:lang?/adventure/:id', lang, (req, res) => {
	res.json({});
});

/**
 * Deletes a existing adventure given it's id.
 * @path /:lang?/adventure/:id
 * @method delete
 * @use LangRedirect
 * @auth JWTAuth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {ObjectId} id The adventure's id.
 * @returns {Boolean} The status of the operation.
 */
router.delete('/:lang?/adventure/:id', lang, auth, (req, res) => {
	res.json({});
});

/**
 * Creates a new adventure.
 * @path /:lang?/adventure
 * @method put
 * @use LangRedirect
 * @auth JWTAuth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {Boolean} [status=false] If it is to return only the status of the operation.
 * @returns {Adventure} The new adventure.
 */
router.put('/:lang?/adventure', lang, auth, (req, res) => {
	return Adventure.create({
		owner: req.user.id,
		canonicalname: req.body.name,
		canonicallang: req.body.lang,
		translations: [{
			lang: req.body.lang,
			name: req.body.name,
			description: req.body.description,
			content: req.body.content
		}],
		category: req.body.category,
		system: req.body.system,
		players: [...req.body.players],
		parent: req.body.parent,
		tags: [...req.body.tags]
	})
	.then((adventure) => res.json(adventure))
	.catch((err) => res.status(400).send(err.message));
});

/**
 * General fallback route.
 * @path *
 * @method all
 * @returns {303} Redirects to the docs url.
 */
router.use('*', (req, res) => {
	//TODO: propper handle errors
	res.set('Location', `https://${req.hostname}/docs/api/v1`);
	res.status(303).send('This is not the URL you are looking for...');
});

module.exports = router;