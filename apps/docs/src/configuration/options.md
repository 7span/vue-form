# Options

When using VueForm, you can pass an options object to customize its behavior. These options allow you to define global behavior.

### `componentPrefix`

- Type: `string`
- Default: `''`

Adds a prefix to the globally registered components. Useful to avoid naming conflicts or to follow a naming convention in your app.

### `isNewItemCheck`

- Type: `Function`
- Arguments: `(context) => Boolean`

[Read more](/configuration/new-item-check.md)

### `errorAdapter`

- Type: `Function`
- Arguments: `(context) => boolean`

[Read more](/configuration/error-adapter.md)
