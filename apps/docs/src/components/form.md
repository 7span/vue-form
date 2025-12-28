# `<VueForm>` - The Root Component

The root component that wires everything together. It manages the entire data lifecycle - state, fields, values, and API calls -and provides context for all child components.

It's the only component you must include. Every other component depends on the context provided by `<VueForm>`.

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <!-- Child Components-->
    </template>
  </VueForm>
</template>
```

## Props

### `fields`

- Type: `Array`
- Default: `[]`

Array defining the form structure. Can contain field configuration objects, field name strings, or a mix of both.

```js
// Objects only
const fields = [{ name: "email", value: "john@doe.com" }, { name: "age" }];

// Strings only
const fields = ["name", "email", "phone"];

// Mixed
const fields = [{ name: "email", value: "john@doe.com" }, "name", "phone"];
```

### `itemId`

- Type: `Number|String`

The identifier passed to `isNewItemCheck` for mode detection. Use special strings like '+' or 'create' to indicate create mode, or pass the database ID for update mode.

```vue
<!-- Create mode -->
<VueForm :item-id="'+'" />
<VueForm :item-id="'create'" />

<!-- Update mode -->
<VueForm :item-id="7" />
<VueForm :item-id="'abc-123'" />

<!-- From route params -->
<VueForm :item-id="$route.params.id" />
```

See how to use `itemId` in `isNewItemCheck` [here](/configuration/new-item-check.md)

### `create`

- Type: `Function`
- Signature: `(context) => Promise<VueFormApiResponse>`

Async function called when the create button is clicked. Receives the full`context` object and must return a promise resolving to a `VueFormApiResponse`.

```js
function create(context){
  return fetch('/api/users/').then(res=>{
    return {
      values:{...} // {key:value} pairs for each field
    }
  })
}
```

::: tip Important
Do not catch errors in your create, read, update, delete, archive, or unarchive methods. [Read more](/configuration/error-adapter.md)
:::

### `read`

- Type: `Function`
- Signature: `(itemId, context) => Promise<VueFormApiResponse>`

Async function called when the component is mounted and update mode is detected. Must return a promise resolving to a `VueFormApiResponse`.

```js
function read(itemId, context){
  return fetch(`/api/users/${itemId}`).then(res=>{
    return {
      values:{...} // {key:value} pairs for each field
    }
  })
}
```

### `update`

- Type: `Function`
- Signature: `(itemId, context) => Promise<VueFormApiResponse>`

Async function called when the update button is clicked. Must return a promise resolving to a `VueFormApiResponse`.

```js
function update(itemId, context){
  return fetch(`/api/users/${itemId}`).then(res=>{
    return {
      values:{...} // {key:value} pairs for each field
    }
  })
}
```

### `delete`

- Type: `Function`
- Signature: `(itemId, context) => Promise<VueFormApiResponse>`

Async function called when the delete button is clicked. Must return a promise resolving to a `VueFormApiResponse`.

```js
function update(itemId, context){
  return fetch(`/api/users/${itemId}`).then(res=>{
    return {
      values:{...} // {key:value} pairs for each field
    }
  })
}
```

### `archive`

- Type: `Function`
- Signature: `(itemId, context) => Promise<VueFormApiResponse>`

Async function called when the delete button is clicked. Must return a promise resolving to a `VueFormApiResponse`.

```js
function update(itemId, context){
  return fetch(`/api/users/${itemId}`).then(res=>{
    return {
      values:{...} // {key:value} pairs for each field
    }
  })
}
```

### `unarchive`

- Type: `Function`
- Signature: `(itemId, context) => Promise<VueFormApiResponse>`

Async function called when the delete button is clicked. Must return a promise resolving to a `VueFormApiResponse`.

```js
function update(itemId, context){
  return fetch(`/api/users/${itemId}`).then(res=>{
    return {
      values:{...} // {key:value} pairs for each field
    }
  })
}
```

## Events

There are no events added at the moment.

## Slots

### `default`

The only slot available in `<VueForm>` is `default`. It exposes a set of scoped variables that you can access.

#### Slot Props

| Key           | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| context       | `Object` <br/> The context object                                                                  |
| readItem      | `Function` <br/> Wrapper of `read` function. You can use this method to manually do the read call  |
| updateItem    | `Function` <br/> Wrapper of `update` function. You can use this instead of `<VueFormUpdate>`       |
| deleteItem    | `Function` <br/> Wrapper of `delete` function. You can use this instead of `<VueFormDelete>`       |
| archiveItem   | `Function` <br/> Wrapper of `archive` function. You can use this instead of `<VueFormArchive>`     |
| unarchiveItem | `Function` <br/> Wrapper of `unarchive` function. You can use this instead of `<VueFormUnarchive>` |
