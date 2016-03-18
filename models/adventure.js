'use strict';
let Schema = require('mongoose').Schema;
let model = require('mongoose').model;
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
	parent: ObjectId,
	tags: [String]
});

//TODO: set validation on save, test if there is at last one translation.

module.exports = model('Adventure', AdventureSchema);