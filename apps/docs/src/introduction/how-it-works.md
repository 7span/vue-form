# How It Works

### Lifecycle

VueForm manages the complete CRUD lifecycle automatically based on the mode (create or update). Understanding this flow helps you configure the plugin correctly.

## Modes

`<VueForm>` operates in one of two modes: Create or Update. The mode is automatically determined based on whether an item ID is present.

#### 1. Create Mode

When you're creating a new item and don't have an existing ID.

- No initial data is fetched from the API
- Form fields are populated with default values from your field configuration
- The `<VueFormCreate>` button is visible
- Clicking the button calls your `create` method to save the new item

#### 2. Update Mode

When you're editing an existing item and have a unique ID from the database.

- The read method is called with the item ID to fetch existing data
- Form fields are pre-filled with the retrieved data
- The `<VueFormUpdate>` button is visible
- Clicking the button calls your `update` method to save changes

To configure the mode detection, use the `isNewItemCheck` option. [Read more](/configuration/new-item-check.md)

## On Mount & Read

When `<VueForm>` mounts, the following sequence occurs:

1. **Mode Detection:** VueForm calls `isNewItemCheck` with the `item-id` prop to determine the operation mode.
2. **Create Mode:** when `isNewItemCheck` returns `true`
   - No API call is made
   - Default field values are applied from the field configuration
3. **Update Mode:** when `isNewItemCheck` returns `false`
   - The `read` function is called with `itemId` as the argument
   - You fetch the existing data from the API and return it
   - Populates form fields with the retrieved data

## Create

The `<VueFormCreate>` renders a create button. The button is only visible in create mode.

When clicked:

- VueForm calls the `create` method from props
- The create method performs the API call and returns the result
- On success: Form state updates with the new response data
- On failure: The `errorAdaptor` is called to format and display errors

## Update

The `<VueFormUpdate>` renders an update button. The button is only visible in update mode.

When clicked:

- VueForm calls the `update` method from props
- The update method performs the API call and returns the result
- On success: Form state updates with the new response data
- On failure: The `errorAdaptor` is called to format and display errors
