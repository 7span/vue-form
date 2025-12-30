# `<VueFormArchive>`

Renders a archive button that calls the `archive` method on click. The button is automatically visible only in _update_ mode.

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <VueFormArchive
        v-slot="{ archiveItem, isArchiving, isReading, isLoading }"
      >
        <button @click="confirmArchive(archiveItem)" :disabled="isArchiving">
          {{ isArchiving ? "Deleting..." : "Delete" }}
        </button>
      </VueFormArchive>
    </template>
  </VueForm>
</template>

<script setup>
function confirmArchive(archiveItem) {
  if (confirm("Are you sure?")) {
    archiveItem();
  }
}
</script>
```

## Slots

### `default`

#### Slot Props

| Name          | Description                                           |
| ------------- | ----------------------------------------------------- |
| `archiveItem` | `Function` <br/> Wrapper for calling `archive` method |
| `isArchiving` | `Boolean` <br/> Check the context object docs         |
| `isReading`   | `Boolean` <br/> Check the context object docs         |
| `isLoading`   | `Boolean` <br/> Check the context object docs         |
