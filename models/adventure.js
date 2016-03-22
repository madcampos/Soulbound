'use strict';
let Schema = require('mongoose').Schema;
let mongoose = require('mongoose');
let ObjectId = require('mongoose').SchemaTypes.ObjectId;
let langRegexp = /^[a-z]{2}-[A-Z]{2}$/;

/**
 * An adventure and it's relation with other adventures to form an arc, a campaign or be it an one shot.
 * In general the structure that follows is:
 * Campaign => arc => one shot.
 * @typedef {Object} Adventure
 * @property {ObjectId} id The adventure's id.
 * @property {ObjectId} owner The adventure's owner.
 * @property {String} canonicalname The adventure's canonical name.
 * @property {String} canonicallang The adventure's canonical language.
 * @property {Object[]} translations A list of translations.
 * @property {String} translations.lang The translation lang.
 * @property {String} translations.name The adventure's translated name.
 * @property {String} translations.description The adventure's translated description.
 * @property {String} translations.content The adventure's translated content.
 * @property {String} category The adventure's category.
 * @property {String} system The game systemfor witch the adventure was developed.
 * @property {Object} players The players who are playing and limits.
 * @property {Number} players.min The minimum number of players.
 * @property {Number} players.max The maximum number of players.
 * @property {ObjectId[]} players.playing The players who are playing this adventure.
 * @property {ObjectId} parent The adventure's parent adventure id, if any.
 * @property {String[]} tags A list of tags related to this adventure so that search can be tag based.
 */
let AdventureSchema = new Schema({
	owner: {type: ObjectId, requierd: true},
	canonicalName: {type: String, requierd: true},
	canonicalLang: {type: String, required: true, match: langRegexp},
	translations: [{
		lang: {type: String, required: true, match: langRegexp},
		name: {type: String, requierd: true},
		description: {type: String, maxLength: 256},
		content: String
	}],
	category: {type: String, match: /campaign|arc|oneshot/},
	system: String,
	players: {
		min: {type: Number, min: 1},
		max: {type: Number, min: 1},
		playing: [ObjectId]
	},
	parent: ObjectId,
	tags: [String]
});

//TODO: set validation on save, test if there is at last one translation.
//TODO: test for max < min condition.

module.exports = mongoose.model('Adventure', AdventureSchema);