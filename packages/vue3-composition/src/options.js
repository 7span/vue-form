export default {
  componentPrefix: '',
  isNewItemCheck: (context) => {
    const { itemId } = context
    return itemId === '+'
  },
  isArchivedItemCheck: (response) => {
    return response.isArchived == true
  },
  errorAdapter: (error) => {
    return {
      name: error.name || 'Unknown Error',
      message: error.message || 'There was an unknown error. Please try again.',
      fieldErrors: error.errors || {},
    }
  },
}
