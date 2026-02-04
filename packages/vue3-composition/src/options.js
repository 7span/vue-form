/**
 * @typedef {Object} Context
 */
/**
 * @param {Context} context
 * @returns {Boolean}
 */
function resolveMode(context) {
  const { itemId } = context
  return itemId === '+' ? 'CREATE' : 'UPDATE'
}

/**
 * @typedef {Object} ApiResponse
 */
/**
 * @param {ApiResponse} response
 * @returns {Boolean}
 */
function isArchivedItemCheck(response) {
  return response.isArchived == true
}

/**
 * @typedef {Object} VueFormError
 * @property {string} name - Error name
 * @property {string} message - Generic message which sums up the error
 * @property {Object} fieldErrors - An object containinig {key:value} pairs of each field
 */
/**
 * @typedef {Object} ApiError - Returned by read, create, update, delete, archive or unarchive functions.
 */
/**
 * @param {ApiError} error
 * @returns {VueFormError}
 */

function errorAdapter(error) {
  return {
    name: error.name || 'Unknown Error',
    message: error.message || 'There was an unknown error. Please try again.',
    fieldErrors: error.errors || {},
  }
}

function schemaToFields() {
  return []
}

function validateSchema() {
  return new Promise((resolve) => resolve(true))
}

export default {
  componentPrefix: '',
  resolveMode,
  isArchivedItemCheck,
  errorAdapter,
  schemaToFields,
  validateSchema,
}
