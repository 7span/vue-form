# errorAdapter

The errorAdapter is a function that transforms API error responses or validation errors into a standardized format that VueForm can display. It acts as a translator between your backend's error structure and VueForm's internal error state.

Different APIs return errors in different formats. The errorAdapter normalizes these different structures into a single format VueForm understands.

## How It Works

1. A CRUD method (create, read, update, etc.) throws an error or API returns error response
2. The error is automatically intercepted
3. Your custom `errorAdapter` transforms the error into VueForm's format
4. Processed errors populate the `context.error` object
5. You can now show field-specific errors in your UI

This pattern keeps your CRUD methods clean while ensuring consistent error handling across all operations.

```js
{
  errorAdapter: (error) => {
    // Write your error mapping here.
    return {
      name: error.name || "Unknown Error",
      message: error.message || "There was an unknown error. Please try again.",
      fieldErrors: error.errors || {}, // An object containinig {key:value} pairs of each field
    };
  };
}
```

## Display Errors

```vue
<template>
  <VueForm v-slot="{ context }">
    <input v-model="context.values.email" />
    <span v-if="context.error.email" class="error">
      {{ context.error.email }}
    </span>
  </VueForm>
</template>
```

## Catch Errors

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
