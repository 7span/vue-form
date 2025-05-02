<template>
  <div v-if="!isNewItem" class="vue-form__update">
    <slot v-bind="slotProps">
      <button @click="updateItem">{{ label }}</button>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const updateItem = inject('updateItem')
const isUpdating = inject('isUpdating')
const isReading = inject('isReading')
const isNewItem = inject('isNewItem')
const isLoading = inject('isLoading')

const label = computed(() => {
  if (isUpdating.value) return 'Updating...'
  if (isReading.value) return 'Loading...'
  return 'Update'
})
const slotProps = computed(() => {
  return {
    updateItem,
    isUpdating: isUpdating.value,
    isReading: isReading.value,
    isLoading: isLoading.value,
  }
})
</script>
