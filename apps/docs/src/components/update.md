# `<VueFormUpdate>`

Renders an update button that calls the `update` method on click. The button is automatically visible only in _update_ mode (when editing an existing item) and hidden in _create_ mode (when creating a new item).

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <VueFormUpdate v-slot="{ updateItem, isUpdating, isReading, isLoading }">
        <button @click="updateItem" :disabled="isUpdating">
          {{ isUpdating ? "Updating..." : "Update" }}
        </button>
      </VueFormUpdate>
    </template>
  </VueForm>
</template>
```

## Slots

### `default`

#### Slot Props

| Name         | Description                                          |
| ------------ | ---------------------------------------------------- |
| `updateItem` | `Function` <br/> Wrapper for calling `update` method |
| `isUpdating` | `Boolean` <br/> Check the context object docs        |
| `isReading`  | `Boolean` <br/> Check the context object docs        |
| `isLoading`  | `Boolean` <br/> Check the context object docs        |
