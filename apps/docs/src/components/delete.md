# `<VueFormDelete>`

Renders a delete button that calls the `delete` method on click. The button is automatically visible only in _update_ mode.

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <VueFormDelete v-slot="{ deleteItem, isDeleting, isReading, isLoading }">
        <button @click="confirmDelete(deleteItem)" :disabled="isDeleting">
          {{ isDeleting ? "Deleting..." : "Delete" }}
        </button>
      </VueFormDelete>
    </template>
  </VueForm>
</template>

<script setup>
function confirmDelete(deleteItem) {
  if (confirm("Are you sure?")) {
    deleteItem();
  }
}
</script>
```

## Slots

### `default`

#### Slot Props

| Name         | Description                                          |
| ------------ | ---------------------------------------------------- |
| `deleteItem` | `Function` <br/> Wrapper for calling `delete` method |
| `isDeleting` | `Boolean` <br/> Check the context object docs        |
| `isReading`  | `Boolean` <br/> Check the context object docs        |
| `isLoading`  | `Boolean` <br/> Check the context object docs        |
