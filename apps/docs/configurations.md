# Configurations

Vue Form exposes lightweight plugin options so you can match component prefixes and error handling to your app. Each package has its own defaults.

## Vue 3 (options / slots)

Default options come from `packages/vue3/src/options.js`.

| Option | Default | Description |
| --- | --- | --- |
| `componentPrefix` | `"V"` | Prefix used when registering the global component (exposes `VForm` by default). |
| `errorAdapter` | `(errors) => errors` | Map your backend error shape to `{ fields, message }`. Used by `setErrors` inside the form. |

Configure on install:

```js
import VueForm from '@7span/vue-form'

app.use(VueForm, {
  componentPrefix: 'V',
  errorAdapter: (err) => ({
    fields: err?.errors || {},
    message: err?.message || 'Unable to save form',
  }),
})
```

## Vue 2 (options / slots)

Defaults mirror the Vue 3 options build (`packages/vue2/src/options.js`).

| Option | Default | Description |
| --- | --- | --- |
| `componentPrefix` | `"V"` | Registers `VForm` globally. |
| `errorAdapter` | `(errors) => errors` | Normalize backend errors to `{ fields, message }`. |

Install with options:

```js
import Vue from 'vue'
import VueForm from '@7span/vue-form'

Vue.use(VueForm, {
  componentPrefix: 'V',
  errorAdapter: (err) => ({
    fields: err?.errors || {},
    message: err?.message,
  }),
})
```

## Vue 3 (composition bundle)

Defaults from `packages/vue3-composition/src/options.js`.

| Option | Default | Description |
| --- | --- | --- |
| `componentPrefix` | `""` | Registers `VueForm`, `VueFormField`, etc., without a prefix. |
| `isNewItemCheck` | `({ itemId }) => itemId === '+'` | Decide whether the current record is in “create” mode. |
| `isArchivedItemCheck` | `(response) => response.isArchived == true` | Detect archived records after read/create/update. |
| `errorAdapter` | `(error) => ({ name, message, fieldErrors })` | Normalize errors surfaced to `VueFormError` and slot props. |

Install with overrides:

```js
import VueForm from '@7span/vue-form'

app.use(VueForm, {
  componentPrefix: 'My',
  isNewItemCheck: ({ itemId }) => !itemId,
  errorAdapter: (error) => ({
    name: error?.name || 'RequestError',
    message: error?.message || 'Request failed',
    fieldErrors: error?.errors || {},
  }),
})
```

## Field configuration (all builds)

`fields` accepts an array of strings or objects:

- String: `"email"` → `{ name: 'email', value: null }`
- Object: `{ name: 'email', value: 'hi@a.com', label: 'Email' }`

In the options/slots builds, you can also provide field-level transforms:

- `in(value)` runs before setting local state.
- `out(value)` runs before exposing values to the parent.

Use these to coerce numbers, trim text, or map select values without mutating the original payloads.

