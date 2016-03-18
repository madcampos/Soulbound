'use strict';

/**
 * Filters a string to avoid DB injection.
 * @param {String} str The string to be filtered.
 * @returns {String} The filtered string.
 */
function filterDBString(str){
	return str.replace(/[\$\{\}]/, '');
}

/**
 * Filters a string to avoid URI injection.
 * @param {String} str The string to be filtered.
 * @returns {String} The filtered string.
 */
function filterHTMLString(str) {
	return str.replace('&', '&amp;').replace('>', '&gt;').replace('<', '&:lt;').replace('"', '&quot;').replace('\'', '&#x27;').replace('/', '&#x2F;');
}

/**
 * Filters a string to avoid URI injection.
 * @param {String} str The string to be filtered.
 * @returns {String} The filtered string.
 */
function fixedEncodeURIComponent(str) {
	return encodeURIComponent(str).replace(/[~!'()*._-]/g, (x) => `%${x.charCodeAt(0).toString(16)}`);
}

/**
 * Fixed `charCodeAt` method.
 * @param {String} str The string to search.
 * @param {Number} idx The index to search.
 * @returns {String} The char code at the index.
 */
function fixedCharCodeAt(str, idx) {
	// ex. fixedCharCodeAt('\uD800\uDC00', 0); // 65536
	// ex. fixedCharCodeAt('\uD800\uDC00', 1); // false
	let localIdx = idx || 0;
	let code = str.charCodeAt(localIdx);
	let high, low;

	// High surrogate (could change last hex to 0xDB7F to treat high
	// private surrogates as single characters)
	if (code >= 0xD800 && code <= 0xDBFF) {
		high = code;
		low = str.charCodeAt(localIdx + 1);
		if (isNaN(low)) {
			throw Error('High surrogate not followed by low surrogate.');
		}

		return (high - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
	}

	if (code >= 0xDC00 && code <= 0xDFFF) { // Low surrogate
		// We return false to allow loops to skip this iteration since should have
		// already handled high surrogate above in the previous iteration
		return false;
		/*high = str.charCodeAt(idx - 1);
		low = code;
		return ((high - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
	}

	return code;
}

/**
 * Filters a string to avoid HTML attirbute injection.
 * @param {String} str The string to be filtered.
 * @returns {String} The filtered string.
 */
function filterHTMLAttributes(str){
	return str.replace(/&/g, '&amp;').replace(/[^a-zA-Z0-9<>&;"]/g, (x) => `&#x${x.charCodeAt(0).toString(16)}`).replace(/>/g, '&gt;').replace(/</g, '&:lt;').replace(/"/g, '&quot;');
}

module.exports = {
	filterDBString,
	filterHTMLAttributes,
	filterHTMLString
};