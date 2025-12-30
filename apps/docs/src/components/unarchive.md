# `<VueFormUnarchive>`

Renders a unarchive button that calls the `unarchive` method on click. The button is automatically visible only in _update_ mode.

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <VueFormUnarchive
        v-slot="{ unarchiveItem, isUnarchiving, isReading, isLoading }"
      >
        <button
          @click="confirmUnarchive(unarchiveItem)"
          :disabled="isUnarchiving"
        >
          {{ isUnarchiving ? "Unarchiving..." : "Unarchive" }}
        </button>
      </VueFormUnarchive>
    </template>
  </VueForm>
</template>

<script setup>
function confirmUnarchive(unarchiveItem) {
  if (confirm("Are you sure?")) {
    unarchiveItem();
  }
}
</script>
```

## Slots

### `default`

#### Slot Props

| Name            | Description                                             |
| --------------- | ------------------------------------------------------- |
| `unarchiveItem` | `Function` <br/> Wrapper for calling `unarchive` method |
| `isUnarchiving` | `Boolean` <br/> Check the context object docs           |
| `isReading`     | `Boolean` <br/> Check the context object docs           |
| `isLoading`     | `Boolean` <br/> Check the context object docs           |
