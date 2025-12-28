/**
 * @typedef {Object} Context
 */
/**
 * @param {Context} context
 * @returns {Boolean}
 */
function isNewItemCheck(context) {
  const { itemId } = context
  return itemId === '+'
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

export default {
  componentPrefix: '',
  isNewItemCheck,
  isArchivedItemCheck,
  errorAdapter,
}
