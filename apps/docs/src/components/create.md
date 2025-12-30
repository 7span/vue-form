# `<VueFormCreate>`

Renders a create button that calls the `create` method on click. The button is automatically visible only in _create_ mode (when creating a new item) and hidden in _update_ mode (when editing an existing item).

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <VueFormCreate v-slot="{ createItem, isCreating, isReading, isLoading }">
        <button @click="createItem" :disabled="isCreating">
          {{ isCreating ? "Creating..." : "Create" }}
        </button>
      </VueFormCreate>
    </template>
  </VueForm>
</template>
```

## Slots

### `default`

#### Slot Props

createItem
isCreating
isReading
isLoading

| Name         | Description                                          |
| ------------ | ---------------------------------------------------- |
| `createItem` | `Function` <br/> Wrapper for calling `create` method |
| `isCreating` | `Boolean` <br/> Check the context object docs        |
| `isReading`  | `Boolean` <br/> Check the context object docs        |
| `isLoading`  | `Boolean` <br/> Check the context object docs        |
