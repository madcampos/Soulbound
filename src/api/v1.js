/**
 * This is the `API` for the Soulbound project.
 * @restapi
 * @version 1.0
 * @accepts application/json
 * @returns application/json
 */
'use strict';
let router = require('express').Router();

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
router.get('/:lang?/adventures', (req, res, next) => {
	//TODO: work search by name, validate and restrain name to a subset?
	//TODO: filter user input
	res.send('');
});

/**
 * Updates a existing adventure given it's id.
 * @method put
 * @path /:lang?/adventure/:id
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {UUID} id The adventure's id.
 * @param {Boolean} [status=false] If it's to return only the status of the operation.
 * @returns {Adventure} The modified adventure.
 */
router.put('/:lang?/adventure/:id', (req, res) => {
	res.send('');
});

/**
 * Deletes a existing adventure given it's id.
 * @method delete
 * @path /:lang?/adventure/:id
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {UUID} id The adventure's id.
 * @returns {Boolean} The status of the operation.
 */
router.delete('/:lang?/adventure/:id', (req, res) => {
	res.send('');
});

/**
 * Creates a new adventure.
 * @method post
 * @path /:lang?/adventure/
 * @auth
 * @param {String} [lang='en-US'] The language to use in the format `xx-YY`.
 * @param {false|UUID} [status=false] If it's to return the id if sucessfull or false if unsucessfull.
 * @returns {Adventure} The new adventure.
 */
router.post('/:lang?/adventure/', (req, res) => {
	res.send('');
});

router.use('*', (req, res) => {
	//TODO: propper handle errors
	res.set('Location', `https://${req.hostname}/docs/api/v1`);
	res.status(303).send('This is not the URL you are looking for...');
});

module.exports = router;