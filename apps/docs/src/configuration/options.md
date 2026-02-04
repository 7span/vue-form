# Options

When using VueForm, you can pass an options object to customize its behavior. These options allow you to define global behavior.

### `componentPrefix`

- Type: `string`
- Default: `''`

Adds a prefix to the globally registered components. Useful to avoid naming conflicts or to follow a naming convention in your app.

### `resolveMode`

- Type: `Function`
- Arguments: `(context) => String`

[Read more](/configuration/resolve-mode.md)

### `errorAdapter`

- Type: `Function`
- Arguments: `(context) => boolean`

[Read more](/configuration/error-adapter.md)

### `schemaToFields`

- Type: `Function`
- Arguments: `(context) => Array`

[Read more](/configuration/schema-to-fields.md)

### `validateSchema`

- Type: `Function`
- Arguments: `(context) => Promise<boolean>`

[Read more](/configuration/validate-schema.md)
