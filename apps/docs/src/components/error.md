# `<VueFormError>`

Renders error messages from failed CRUD operations. When any method (create, update, delete, read, archive, unarchive) throws an error, it's automatically caught, processed through the errorAdapter, and made available for display.

```vue
<template>
  <VueForm>
    <VueFormError #default="{ error }">
      <span>{{ error }}</span>
    </VueFormError>
    <template #default="{...}">
      <VueFormFields>
        <!-- Fields -->
      </VueFormFields>
    </template>
  </VueForm>
</template>
```

## Slots

### `default`

#### Slot Props

| Name    | Description                                                          |
| ------- | -------------------------------------------------------------------- |
| `error` | `VueFormError` <br/> The error object parsed from the `errorAdapter` |
