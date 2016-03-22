/*eslint-disable require-jsdoc, no-process-env, no-invalid-this, func-style*/
/*global suite, test*/
'use strict';
//see this: https://github.com/request/request/issues/2061#issuecomment-182573171
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let chai = require('chai');
chai.config.includeStack = false;
chai.config.showDiff = false;

let assert = chai.assert;
let config = require('config');
let randomString = (len) => `${len ? Math.trunc(Math.random() * Math.pow(10, 16)).toString(36).substr(-10) : ''}${len > 10 ? randomString(len - 10) : ''}`.substr(0, len);
let baseUrl = `https://${config.get('hostname')}`;
let baseApiUrl = `${baseUrl}/api/v1`;

let token = {
	value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpIjoiNTZmMTQzZWU3NWMxMjExYzFmNjUyNTM4IiwibiI6InRlc3R1c2VyIiwiciI6InVzZXIiLCJpYXQiOjE0NTg2NTUzODUsImV4cCI6MTQ1OTI2MDE4NX0.8lrNW7-MbjzdbRrzhtSW1RgyRpJDlFU8d45b5249PL4',
	expiration: '2016-03-29T14:03:05.945Z',
	creation: '2016-03-22T14:03:05.945Z'
};
let user = {
	id: '56f143ee75c1211c1f652538',
	name: 'testuser',
	password: '123456',
	email: 'me@server.test'
};
let adventureId = '';
let testAdventure = {
	owner: '56f143ee75c1211c1f652538',
	canonicalName: 'Test adventure',
	canonicalLang: 'en-US',
	translations: [{
		lang: 'en-US',
		name: 'Test adventure',
		description: randomString(30),
		content: randomString(100)
	}],
	category: 'oneshot',
	tags: ['test', 'such test', 'much unit', 'wow']
};

let request = require('request').defaults({json: true, headers: {Authorization: `Bearer ${token.value}`, 'Content-Type': 'application/json'}});

function assertResponse(test, done){
	if (done) {
		return (err, res, body) => {
			if (!err) {
				test(body, res);
				return done();
			}

			return done(err);
		};
	}

	return (err, res, body) => {
		if (!err) {
			test(res, body);
		}
	};
}

suite('API v1 test', function(){
	this.slow(7000);
	this.timeout(60000);

	suite('General testing', function(){
		test('Language redirection', function(done){
			request.get(`${baseApiUrl}/en-us/adventures`,(err, res, body) => {
				if (!err) {
					assert.equal(res.request.uri.path, '/api/v1/en-US/adventures');
					return done();
				}

				return done(err);
			});
		});

		test('Get JWT', function(done){
			request.post({url: `${baseUrl}/user/${user.id}/token`, body: {password: user.password}}, (err, res, body) => {
				if (!err) {
					assert.deepEqual(body, token);
					return done();
				}

				return done(err);
			});
		});
	});

	suite('Adventure test', function(){
		test('New adventure.', function(done){
			request.put({url: `${baseApiUrl}/en-US/adventure`, body: testAdventure}, (err, res, body) => {
				if (!err) {
					let adventure = body;
					adventureId = testAdventure.id = adventure.id;
					assert.deepEqual(adventure, testAdventure);

					return done();
				}

				return done(err);
			});
		});

		test('Adventure searching.', function(done){
			request.get({url: `${baseApiUrl}/en-US/adventure/${adventureId}`}, (err, res, body) => {
				if (!err) {
					assert.deepEqual(body, testAdventure);
					return done();
				}

				return done(err);
			});
		});

		test('Edit existing adventure.', function(done){
			let editedAdventure = testAdventure;
			editedAdventure.translations[0].content = randomString(200);

			request.post({url: `${baseApiUrl}/en-US/adventure/${adventureId}`, body: editedAdventure}, (err, res, body) => {
				if (!err) {
					assert.deepEqual(body, editedAdventure);
					return done();
				}

				return done(err);
			});
		});

		test('Deleting adventure.', function(done){
			request.del({url: `${baseApiUrl}/en-US/adventure/${adventureId}`}, (err, res, body) => {
				if (!err) {
					assert.ok(body);
					return done();
				}

				return done(err);
			});
		});
	});
});