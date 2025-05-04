<template>
  <div v-if="!isReading" class="vue-form__delete">
    <slot v-bind="slotProps">
      <button @click="deleteItem">{{ label }}</button>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const deleteItem = inject('deleteItem')
const isDeleting = inject('isDeleting')
const isReading = inject('isReading')
const isLoading = inject('isLoading')

defineOptions({
  name: 'VueFormDelete',
})

const label = computed(() => {
  if (isDeleting.value) return 'Deleting...'
  if (isReading.value) return 'Loading...'
  return 'Delete'
})
const slotProps = computed(() => {
  return {
    deleteItem,
    isDeleting: isDeleting.value,
    isReading: isReading.value,
    isLoading: isLoading.value,
  }
})
</script>
