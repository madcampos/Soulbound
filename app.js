/*global __dirname, module, console, global, __, __n*/

var dbURL = 'soulbound';

var express = require('express'),
	i18n = require('i18n'),
	fs = require('fs'),
	path = require('path');

var app = module.exports = express.createServer();

/**
 * Filter game data from database
 * @param {Object} docs The database returned object
 * @param {String} gameName The name of the game to search, if none is providade return null
 */
var gameDataFilter = function(docs, gameName){
	if (gameName){
		var game = {};
		var listGroupItens = function(group, type) {
			var mapped = [];
			var _el;
			var filter = function(el, idx, arr){
				return el.type == type && el.group == _el ? true : false;
			};
			var mapper = function(el){
				return el.className ? [el.name, el.desc, el.className] : [el.name, el.desc];
			};
			
			for (var i in group) {
				_el = group[i][0];
				mapped[i] = docs.filter(filter).map(mapper).sort();
			}
			
			return mapped;
		};			
		var listGroupHeaders = function(group){
			var mapped = docs.filter(function(el){
				return el.type == group ? true : false;
			}).map(function(el){
				return el.className ? [el.name, el.desc, el.className] : [el.name, el.desc];
			}).sort();
			return mapped;
		};
		
		switch (gameName) {
			case 'shadowrun':
				game.metatypes = listGroupHeaders('metatype');
				game.attList = listGroupHeaders('attribute');
				game.skillList = listGroupItens(game.attList, 'skill');
				game.qualityTypes = listGroupHeaders('qualityType');
				game.qualityList = listGroupItens(game.qualityTypes, 'quality');
				game.implantsGroups =  listGroupHeaders('implantGroup');
				game.implantList = listGroupItens(game.implantsGroups, 'implant');
				game.weaponGroups = listGroupHeaders('weaponGroup');
				game.weaponList = listGroupItens(game.weaponGroups, 'weapon');
				game.gunsGroups = listGroupHeaders('gunGroup');
				game.gunsList = listGroupItens(game.gunsGroups, 'gun');
				game.spellGroups = listGroupHeaders('spellGroup');
				game.spellList = listGroupItens(game.spellsGroups, 'spell');
				game.powerGroups = listGroupHeaders('powerGroup');
				game.powerList = listGroupItens(game.powerGroups, 'power');
				game.programGroups = listGroupHeaders('programGroup');
				game.programList = listGroupItens(game.programGroups, 'program');
				game.armorGroups = listGroupHeaders('armorGroup');
				game.armorList = listGroupItens(game.armorGroups, 'armor');
				game.miscGroups = listGroupHeaders('miscGroup');
				game.miscList = listGroupItens(game.miscGroups, 'misc');
				game.spellsDescription = 'Type:\n\tP = Physical\n\tM = Mental\n' +
					'Range:\n\t' +
						'LOS = Line of sight\n\t' +
						'T = Touch\n\t' +
						'V = Voluntary targets only\n\t' +
						'A = Area spell\n' +
					'Damage:\n\t' +
						'P = Physical\n\t' +
						'S = Stun\n' +
					'Duration:\n\t' +
						'I = Instant\n\t' +
						'S = Sustained\n\t' +
						'P = Permanent\n' +
					'Drain Value:\n\t' +
						'F = Force';
			break;
			case 'dnd':
			break;
			case 'fallout':
			break;
		}
		
		return game;
	} else {
		return null;
	}
};

// Configuration

app.configure(function(){
	app.set('view cache', false);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	i18n.configure({
		locales : ['en', 'pt-br'],
		register: global
	});
	
	app.use(i18n.init);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.use(express.cookieParser());
	app.use(express.session({secret : '8a5346b9a510f1f698ab0062b71201ac'}));
	app.helpers({
		hasAvatar : function(id){return path.existsSync(__dirname + '/public/images/public/characters/' + id + '.png', function(exists) {return exists;});}
	});
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

/**
 * Default route, goes to dashboard or presentation page
 */
app.get('/', function(req, res) {
	var db = require('mongojs').connect(dbURL, ['users','characters','maps','npcs','histories', 'games']);
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	
	//TODO: create dashboard redirection && create login system
	db.users.findOne({'name' : 'test'}, function(err, doc) {
		if (err || !doc){
			res.redirect('/forbidden', 403);
		} else {
			db.characters.find({'owner' : doc._id.toString()}).limit(10, function(err, chars){
				db.maps.find({'owner' : doc._id.toString()}).limit(10, function(err,maps){
					db.histories.find({'owner' : doc._id.toString()}).limit(10, function(err,hists){
						db.npcs.find({'owner' : doc._id.toString()}).limit(10, function(err,npcs){
							res.render('dashboard', {css : 'dashboard', js : null, title : __('Soulbound Project'), isLoged : true, 'chars' : chars, 'maps' : maps, 'hists' : hists, 'npcs' : npcs});
						});
					});
				});
			});
		}
	});
});

/**
 * Character route, handle character viewing, editing, creation, removing and listing
 */
app.get('/character/:op/:id?', function(req, res){
	var db = require('mongojs').connect(dbURL, ['characters', 'games']);
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	//TODO: login
	var userId = '4f40ad6b093f2cc2df994d2a';
	if (req.params.op) {
		if (req.params.op != 'list' && req.params.op != 'new' && req.params.id) {
			if(req.params.id.length == 24 && /[A-Za-z0-9]{24}/.test(req.params.id)){
				var oid = require('mongojs').ObjectId(req.params.id);
				db.characters.findOne({'_id' : oid}, function(err, doc){
					if (err || !doc) {
						res.redirect('/404');
					} else {
						//TODO: char data - game especific - output
						switch (req.params.op) {
							case 'edit' :
								db.games.find({'game' : doc.game}, function(err, game){
									res.render('games/' + doc.game + '/character_edit', {css : 'games/' + doc.game + '/characterEdit', js : ['games/shadowrun'], title : __('Soulbound Project'), isLoged : true, 'char' : doc, 'game' : gameDataFilter(game, doc.game)});
								});
							break;
							case 'view' :
								res.render('games/' + doc.game + '/character_view', {css : 'games/' + doc.game + '/characterView', js : null, title : __('Soulbound Project'), isLoged : true, 'char' : doc});
							break;
							case 'remove' :
								res.send('remove' + doc._id);
							break;
							case 'update':
								res.send('update' + doc._id);
							break;
							case 'save':
								res.send('save' + doc._id);
							break;
							default:
								res.redirect('/404');
							break;
						}
					}
				});
			} else {
				res.redirect('/404');
			}
		} else {
			switch (req.params.op) {
				case 'new':
					if (req.params.id && /^(shadowrun|dnd|fallout)/.test(req.params.id)) {
						res.send('new: ' + req.params.id);
					} else {
						res.redirect('/404');
					}
				break;
				case 'list':
					if (req.params.id) {
						if(!isNaN(req.params.id)){
							db.characters.find({'owner' : userId}).limit(5).skip(req.params.id * 5, function(err, docs){
								if (err || !docs) {
									res.redirect('/404');
								} else {
									if (docs.length === 0) {
										res.redirect('/404');
									} else {
										res.render('games/characters', {css : 'characterList', js : null, title : __('Soulbound Project'), isLoged : true, 'chars' : docs, 'curentPage' : req.params.id});
									}
								}
							});
						} else {
							res.redirect('/404');
						}
					} else {
						db.characters.find({'owner' : userId}).limit(5, function(err, docs){
							if (err || !docs) {
								res.redirect('/404');
							} else {
								res.render('games/characters', {css : 'characterList', js : null, title : __('Soulbound Project'), isLoged : true, 'chars' : docs, 'currentPage' : null});
							}
						});
					}
				break;
				default:
					res.redirect('/404');
				break;
			}
		}
	} else {
		res.redirect('/404');
	}
});

app.get('/map/:op/:id?', function(req, res){
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	res.send('maps');
});

app.get('/history/:op/:id?', function(req, res){
	var db = require('mongojs').connect(dbURL, ['histories']);
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	//TODO: login
	var userId = '4f40ad6b093f2cc2df994d2a';
	if (req.params.op) {
		if (req.params.op != 'list' && req.params.op != 'new' && req.params.id) {
			if(req.params.id.length == 24 && /[A-Za-z0-9]{24}/.test(req.params.id)){
				var oid = require('mongojs').ObjectId(req.params.id);
				db.histories.findOne({'_id' : oid}, function(err, doc){
					if (err || !doc) {
						res.redirect('/404');
					} else {
						switch (req.params.op) {
							case 'edit' :
								res.render('history/historyEdit', {css : 'historyView', js : null, title : __('Soulbound Project'), isLoged : true, 'hist' : doc});
							break;
							case 'view' :
								res.render('history/historyView', {css : 'historyView', js : null, title : __('Soulbound Project'), isLoged : true, 'hist' : doc});
							break;
							case 'remove' :
								res.send('remove' + doc._id);
							break;
							case 'update':
								res.send('update' + doc._id);
							break;
							case 'save':
								res.send('save' + doc._id);
							break;
							default:
								res.redirect('/404');
							break;
						}
					}
				});
			} else {
				res.redirect('/404');
			}
		} else {
			switch (req.params.op) {
				case 'new':
					if (!req.params.id) {
						res.send('new: ' + req.params.id);
					} else {
						res.redirect('/404');
					}
				break;
				case 'list':
					if (req.params.id) {
						if(!isNaN(req.params.id)){
							db.histories.find({'owner' : userId}).limit(5).skip(req.params.id * 5, function(err, docs){
								if (err || !docs) {
									res.redirect('/404');
								} else {
									if (docs.length === 0) {
										res.redirect('/404');
									} else {
										res.render('history/histories', {css : 'historyList', js : null, title : __('Soulbound Project'), isLoged : true, 'hists' : docs, 'curentPage' : req.params.id});
									}
								}
							});
						} else {
							res.redirect('/404');
						}
					} else {
						db.histories.find({'owner' : userId}).limit(5, function(err, docs){
							if (err || !docs) {
								res.redirect('/404');
							} else {
								res.render('history/histories', {css : 'historyList', js : null, title : __('Soulbound Project'), isLoged : true, 'hists' : docs, 'curentPage' : null});
							}
						});
					}
				break;
				default:
					res.redirect('/404');
				break;
			}
		}
	} else {
		res.redirect('/404');
	}
});

app.get('/npc/:op/:id?', function(req, res){
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	res.send('npc');
});

app.get('/config', function(req, res){
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	res.send('config');
});

app.get('/404', function(req, res){
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	res.render('error/404', {title : __('Soulbound Project'), layout : false});
});

app.get('/forbidden', function(req, res){
	i18n.setLocale(req.header('accept-language').match(/(^\w\w-\w\w)|(^\w\w)/)[0].toLowerCase());
	res.render('error/forbidden', {css : 'forbidden', title : __('Soulbound Project')});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);