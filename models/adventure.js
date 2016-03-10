/**
 * An adventure and it's relation with other adventures to form an arc, a campaign or be it an one shot.
 * In general the structure that follows is:
 * Campaign => arc => one shot.
 * @typedef {Object} Adventure
 * @property {UUID} id The adventure's id.
 * @property {UUID} owner The adventure's owner.
 * @property {String} canonicalname The adventure's canonical name.
 * @property {String} canonicallang The adventure's canonical language.
 * @property {Object[]} translations A list of translations.
 * @property {String} translations.lang The translation lang.
 * @property {String} translations.name The adventure's translated name.
 * @property {String} translations.description The adventure's translated description.
 * @property {String} translations.content The adventure's translated content.
 * @property {String} category The adventure's category.
 * @property {UUID} parent The adventure's parent adventure id, if any.
 * @property {String[]} tags A list of tags related to this adventure so that search can be tag based.
 */