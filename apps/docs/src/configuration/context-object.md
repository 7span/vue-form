# The Context Object

The context object is the single source of truth passed to multiple functions as arguments and as slot scopes.
It contains everything VueForm knows about the current state bundled into a neat, opinionated object.

```js
{
    isCreateMode: Boolean,
    isUpdateMode: Boolean,
    mode: String, // CREATE or UPDATE
    schema: Object,
    normalizedFields: Array,
    values: Object,
    dirtyValues: Object,
    error: Object,
    itemId: String,
    isReading: Boolean,
    isCreating: Boolean,
    isUpdating: Boolean,
    isDeleting: Boolean,
    isArchiving: Boolean,
    isLoading: Boolean,
    isArchived: Boolean,
    touched: Array,
    dirty: Array,
}
```

### isCreateMode

If `resolveMode` returns `UPDATE`, this will be true.

### isCreateMode

If `resolveMode` returns `CREATE`, this will be true.

### mode

The mode returned by `resolveMode`. It should be either `CREATE` or `UPDATE`

### schema

The original schema passed to the `<VueForm>`.

### normalizedFields

Processed field configuration with defaults applied and internal transformations.

### values

Current form values as key-value pairs. Updates reactively as users input data.

### dirtyValues

Only the fields that have been modified since the form loaded or last saved.

### error

Validation and API errors formatted by `errorAdaptor`. Contains field-specific error messages.

### itemId

The unique identifier of the item being edited.

### isReading

`true` while the `read` method is fetching data on mount.

### isCreating

`true` while the `create` method is executing after clicking the `<VueFormCreate>` button.

### isUpdating

`true` while the `update` method is executing after clicking the `<VueFormUpdate>` button.

### isDeleting

`true` while the delete method is executing. Used with `<VueFormDelete>` button.

### isArchiving

`true` while the archive method is executing. Used with `<VueFormArchive>` button.

### isLoading

`true` when any async operation is in progress (reading, creating, updating, deleting, or archiving).

### isArchived

`true` if the current item has been marked as archived.

### touched

Array tracking which fields have been focused or interacted with by the user.

### dirty

Array tracking which fields have been modified from their initial values.
