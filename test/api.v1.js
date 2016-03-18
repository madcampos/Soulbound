'use strict';

//see this: https://github.com/request/request/issues/2061#issuecomment-182573171
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let assert = require('assert');
let test = require('tst');
let config = require('config');

let request = require('request').defaults({baseUrl: `https://${config.get('hostname')}/api/v1/`});

let randomString = (len) => `${len ? Math.trunc(Math.random() * Math.pow(10, 16)).toString(36).substr(-10) : ''}${len > 10 ? randomString(len - 10) : ''}`.substr(0, len);
let token = '';
let headers = () => ({Authorization: `Bearer ${token}`});

let adventureId = '';
let testAdventure = {
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

test('API v1 test', () => {
	test('General testing', () => {
		test('Language redirection', (done) => {
			request.get('/en-us/adventures', (err, res, body) => {
				if (!err) {
					assert.equal(res.request.uri.path, '/api/v1/en-US/adventures');
				} else {
					assert.fail(null, null, err);
				}

				done();
			});
		});

		test('Get JWT', (done) => {
			request.put({url: '/user/token', body: {user: 'test', password: 'test123'}, json: true}, (err, res, body) => {
				if (!err) {
					assert.ok(JSON.parse(body).value);
				} else {
					assert.fail(null, null, err);
				}

				done();
			});
		});
	});
	test('Adventure test', () => {
		test('New adventure.', (done) => {
			request.put({url: '/en-US/adventure', json: true, body: testAdventure, headers: headers()}, (err, res, body) => {
				if (!err) {
					let adventure = JSON.parse(body);
					adventureId = testAdventure.id = adventure.id;
					testAdventure.owner = adventure.owner;
					assert.deepEqual(adventure, testAdventure);
				} else {
					assert.fail(null, null, err);
				}

				done();
			});
		});

		test('Adventure searching.', (done) => {
			request.get({url: `/en-US/adventure/${adventureId}`}, (err, res, body) => {
				if (!err) {
					assert.deepEqual(JSON.parse(body), testAdventure);
				} else {
					assert.fail(null, null, err);
				}

				done();
			});
		});

		test('Edit existing adventure.', (done) => {
			let editedAdventure = testAdventure;
			editedAdventure.translations[0].content = randomString(200);

			request.post({url: `/en-US/adventure/${adventureId}`, json: true, body: editedAdventure, headers: headers()}, (err, res, body) => {
				if (!err) {
					assert.deepEqual(JSON.parse(body), editedAdventure);
				} else {
					assert.fail(null, null, err);
				}

				done();
			});
		});

		test('Deleting adventure.', (done) => {
			request.delete({url: `/en-US/adventure/${adventureId}`, headers: headers()}, (err, res, body) => {
				if (!err) {
					assert.ok(JSON.parse(body));
				} else {
					assert.fail(null, null, err);
				}

				done();
			});
		});
	});
});