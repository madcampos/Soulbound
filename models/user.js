/**
 * User model definition
 * @typedef {Object} User
 * @property {UUID} id The user's id.
 * @property {String} email The user's email.
 * @property {String} password The user's password.
 * @property {Object} token The user's current token.
 * @property {String} token.value The user's current token value. //Is needed?
 * @property {Date} token.expiration The token's expiration date.
 * @property {Date} token.creation The token's creation date.
 */