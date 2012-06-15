/*jslint node:true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

/**
 *	Validation regexps and functions
 */

var colorValidate = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/;
var langValidate = /([a-zA-Z]{2}-[a-zA-Z]{2})|([a-zA-Z]{2})/;
var emailValidate = /^[a-zA-Z0-9][a-zA-Z0-9\_\-\.]{0,24}@[a-zA-Z0-9][a-zA-Z0-9\_\-\.]{0,61}\.([a-zA-Z]{2,6}|[a-zA-Z]{2,6}\.[a-zA-Z]{2,6})/;
var imageSize = function(image) {
	return true;
};
var descriptionLength = function(description) {
	return description.length <= 140 ? true : false;
};
var gametypes = [
	  'Shadowrun'
	, 'D&D'
	, 'Storyteller'
	, 'Paranoia'
	, 'Toon'
	, 'GURPS'
	, 'Indie'
];

/**
 *	image conversion to base64
 */

var imageBase64 = function(image) {
	var buffer = new Buffer(image);
	return buffer.toString('base64');
};

/**
 *	Schemas
 */

var Tag = new Schema({
	  id: {type: ObjectId, required: true, unique: true}
	, name: {type: String, required: true, unique: true}
	, taggedItens: [
		{
			  object: ObjectId
			, reference: String
		}
	]
});

var Skill = new Schema({
	  id: {type: ObjectId, index: true, unique: true}
	, gameType: {type: String, required: true, enum: gametypes}
	, gameModule: {type: String, required: true}
	, name: {type: String, required: true, index: true, lowercase: true, trim: true}
	, value: Number
	, translations: {
		  type: [
			{
				 lang: {type: String, required: ture, validate : langValidate}
				, name: {type: String, required: true}
				, description: {type: String, required: true}
			}
		  ]
		, select: false
	}
});

var Ability = new Schema({
	  id: {type: ObjectId, index: true, unique: true}
	, gameType: {type: String, required: true, enum: gametypes}
	, gameModule: {type: String, required: true}
	, name: {type: String, required: true, index: true, lowercase: true, trim: true}
	, value: {type: Number, required: true}
	, translations: {
		  type: [
			{
				  lang: {type: String, required: ture, validate : langValidate}
				, name: {type: String, required: true}
				, description: {type: String, required: true}
			}
		  ]
		, select: false
	}
});

var Equipament = new Schema({
	  id: {type: ObjectId, index: true, unique: true}
	, gameType: {type: String, required: true, enum: gametypes}
	, gameModule: {type: String, required: true}
	, name: {type: String, required: true, index: true, lowercase: true, trim: true}
	, values: [Number]
	, translations: {
		  type: [
			{
				  lang: {type: String, required: ture, validate : langValidate}
				, name: {type: String, required: true}
				, description: {type: String, required: true}
			}
		  ]
		, select: false
	}
});

var Character = new Schema({
	  id : {type: ObjectId, unique: true}
	, gameType: {type: String, required: true, enum: gametypes}
	, gameModule: String
	, creator: {type: ObjectId, required: true, ref: 'User'}
	, owner: {type: ObjectId, required: true, ref: 'User'}
	, adventure: {type: ObjectId, ref: 'Adventure'}
	, name: {type: String, required: true, index: true}
	, descrition: {type: String, validate: descriptionLength}
	, metadata: {}
	, attributes: {}
	, skills: [{type: ObjectId, ref: 'Skill'}]
	, abilities: [{type: ObjectId, ref: 'Ability'}]
	, equipament: [{type: ObjectId, ref: 'Equipament'}]
	, notes: String
	, tags: [{type: ObjectId, ref: 'Tag'}]
	, rating: {
		  value: Number
		, raters: [
			{
				  user: {type: ObjectId, ref: 'User'}
				, comment: {type: String, validate: descriptionLength}
				, feedback: Boolean
			}
		]
	}
});

var Path = new Schema({
	  initialX: Number
	, initialY: Number
	, finalX: Number
	, finalY: Number
	, alpha: Number
	, color: {type: String, validate: colorValidate}
	, stroke: {type: Number, min: 1, max: 50}
});

var MapItens = new Schema({
	  x: Number
	, y: Number
	, z: Number
	, width: Number
	, height: Number
	, alpha: Number
	, image: {type: String, trim: true, validate: imageSize, set: imageBase64} //TODO: image will came to db in base64 or will be converted here?
});

var Map = new Schema({
	  id: {type: ObjectId, unique: true}
	, name: {type: String, required: true, index: true}
	, descrition: {type: String, validate: descriptionLength}
	, creator: {type: ObjectId, required: true, ref: 'User'}
	, adventure: {type: ObjectId, ref: 'Adventure'}
	, gameType: {type: String, enum: gametypes}
	, gameModule: String
	, grid: {
		  style: {type: String, lowercase: true, enum: ['hex', 'square', 'none']}
		, size: {type: Number, min: 1, max: 50}
		, color: {type:String, validate: colorValidate}
		, stroke: {type: Number, min: 1, max: 50}
	  }
	, background: {type: String, select: false, validate: imageSize, set: imageBase64}
	, width: Number
	, height: Number
	, paths: [Paths]
	, mapItens: [MapItens]
	, tags: [{type: ObjectId, ref: 'Tag'}]
	, raters: [
			{
				  user: {type: ObjectId, ref: 'User'}
				, comment: {type: String, validate: descriptionLength}
				, feedback: Boolean
			}
		]
});

var History = new Schema({
	  id: {type: ObjectId, required: true, unique: true}
	, name: {type: String, required: true, index: true}
	, creator: {type: ObjectId, required: true, ref: 'User'}
	, owner: {type: ObjectId, ref: 'User'}
	, adventure: {type: ObjectId, ref: 'Adventure'}
	, gameType: {type: String, enum: gametypes}
	, gameModule: String
	, description: {type: String, validate: descriptionLength}
	, history: {type: String, required: true}
	, tags: [{type: ObjectId, ref: 'Tag'}]
	, raters: [
			{
				  user: {type: ObjectId, ref: 'User'}
				, comment: {type: String, validate: descriptionLength}
				, feedback: Boolean
			}
		]
});

var Adventure = new Schema({
	  id: {type: ObjectId, required: true, unique: true}
	, name: {type: String, required: true, index: true}
	, creator: {type: ObjectId, required: true, ref: 'User'}
	, descrition: {type: String, validate: descriptionLength}
	, gameType: {type: String, enum: gametypes}
	, gameModule: String
	, gm: {type: ObjectId, ref: 'User'}
	, players: [{type: ObjectId, ref: 'User'}]
	, histories: [{type: ObjectId, ref: 'History'}]
	, adventures: {type: ObjectId, ref: 'Adventure'}
	, maps: {type: ObjectId, ref: 'Map'}
	, tags: [{type: ObjectId, ref: 'Tag'}]
	, raters: [
			{
				  user: {type: ObjectId, ref: 'User'}
				, comment: {type: String, validate: descriptionLength}
				, feedback: Boolean
			}
		]
});

var Manager = new Schema({
	  id: {type: ObjectId, required: true, unique: true}
	, owner: {type: ObjectId, required: ture, ref: 'User'}
	, name: String
	, gameType: {type: String, enum: gametypes}
	, gameModule: String
	, characters: [
		{
			  id: {type: ObjectId, required: true, ref: 'Character'}
			, status: {}
		}
	]
	, npcs: [
		{
			  id: {type: ObjectId, required: true, ref: 'Character'}
			, status: {}
		}
	]
	, incompleteNpcs: [
		{
			  name: String
			, description: String
			, fields: [
				{
					  name: String
					, value: Number
				}
			]
		}
	]
	, adventure: {type: ObjectId, ref: 'Adventure'}
	, map: {type: ObjectId, ref: 'Map'}
	, rollHistory: String
	, currentTurn: {type: ObjectId, ref: 'Character'}
	, status: {} //TODO: decide if will have specific data stored or this will be generic
	, notes: String
});

var User = new Schema({
	  id: {type: ObjectId, unique: true, required: true}
	, name: {type: String, required: true, index: true}
	, email: {type: String, required: true, lowercase: true, unique: true, trim:true, validate: emailValidate}
	, password: {type: String, required: true, set: passwordMD5}
	, gamesPlaying: [{type: ObjectId, ref: 'Adventure'}]
	, gamesGming: [{type: ObjectId, ref: 'Adventure'}]
	, adventures: [{type: ObjectId, ref: 'Adventure'}]
	, characters: [{type: ObjectId, ref: 'Character'}]
	, maps: [{type: ObjectId, ref: 'Map'}]
	, histories: [{type: ObjectId, ref: 'History'}]
	, managers: [{type: ObjectId, ref: 'Manager'}]
	, raters: [
			{
				  user: {type: ObjectId, ref: 'User'}
				, comment: {type: String, validate: descriptionLength}
				, feedback: Boolean
			}
		]
});
