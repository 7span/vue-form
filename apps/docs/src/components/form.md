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

```js
{
  isNewItemCheck: (itemId) => {
    // Return true for create mode, false for update mode
    return itemId == "+" || itemId == "create";
  };
}
```

### `create`

- Type: `Function`
- Signature: `(context) => Promise<responseObject>`

Async function called when the create button is clicked. Receives the full`context` object and must return a promise resolving to a `responseObject`.

```js
const create = (context) => {
    return fetch('/api/users/').then(res=>{
      return {
        values:{...}
      }
    })
  }
```

::: tip Important
Do not catch errors in your create, read, update, delete, archive, or unarchive methods. VueForm's errorAdaptor automatically catches and processes unhandled errors from these functions. If you must catch: Re-throw the error.
:::

```js
const create = (context) => {
  return fetch('/api/users/').then(res=>{
    return {
      values:{...}
    }
  }).catch((err)=>{
    //Your logic
    throw err
  })
}
```

#### How It Works

1. Your CRUD method throws an error or returns a rejected promise
2. VueForm catches the error automatically
3. errorAdaptor formats the error for display
4. Errors are exposed in the form's error state

This pattern keeps your CRUD methods clean while ensuring consistent error handling across all operations.

### `read`

### `update`

### `delete`

### `archive`

### `unarchive`

## Events

| Name            | Arguments | Description |
| --------------- | --------- | ----------- |
| onItemSelect    |           | WIP         |
| onResponse      |           | WIP         |
| afterPageChange |           | WIP         |
| afterLoadMore   |           | WIP         |

## Slots

### `default`

The only slot available in `<VueList>` is `default`. It exposes a set of scoped variables that let you access and render the list state however you like.

#### Slot Props

| Key       | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| items     | `Array` <br/> Array of items returned from the API                                              |
| response  | `Object` <br/> Full response object from the requestHandler                                     |
| isLoading | `Boolean` <br/> Indicating whether the list is currently loading                                |
| selection | `Array` <br/> Object containing selected item(s) if selection is enabled                        |
| error     | Error object if the request failed                                                              |
| isEmpty   | `Boolean` <br/> Indicating if the items array is empty                                          |
| context   | `Object`<br/> The full context object same as passed to the `requestHandler` and `stateManager` |
| refresh   | `Function`<br/> Function to manually trigger a refetch                                          |
