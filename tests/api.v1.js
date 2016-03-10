'use strict';
let test = require('tst');
let assert = require('assert');
let request = require('supertest');

test('API v1 test', () => {
	test('Adventure test', () => {
		test('Language parameter and fallback.', () => {
			//TODO: test for language support
			//TODO: test redirection: xy-wz => xy-WZ
		});

		test('New adventure.', () => {
			//TODO: test adding a new adventure.
			//TODO: test adventure formating.
			//TODO: test adventure error on unacepted formatting.
		});

		test('Edit existing adventure.', () => {
			//TODO: test adventure edition.
		});

		test('Deleting adventure.', () => {
			//TODO: test adventure deletion.
		});

		test('Composing adventures (campaign, arch, subarch, subcampaign, oneshot)', () => {
			//TODO: test adventure composition.
		});

		test('Adventure searching.', () => {
			//TODO: test adventure searching.
		});
	});
});