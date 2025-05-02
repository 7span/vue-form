<template>
  <div v-if="!isReading && !isArchived" class="vue-form__archive">
    <slot v-bind="slotProps">
      <button @click="archiveItem">{{ label }}</button>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const archiveItem = inject('archiveItem')
const isArchiving = inject('isArchiving')
const isArchived = inject('isArchived')
const isReading = inject('isReading')
const isLoading = inject('isLoading')

const label = computed(() => {
  if (isArchiving.value) return 'Archiving...'
  if (isReading.value) return 'Loading...'
  return 'Archive'
})
const slotProps = computed(() => {
  return {
    archiveItem,
    isArchiving: isArchiving.value,
    isReading: isReading.value,
    isLoading: isLoading.value,
  }
})
</script>
