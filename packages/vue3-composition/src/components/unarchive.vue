<template>
  <div v-if="!isReading && isArchived" class="vue-form__unarchive">
    <slot v-bind="slotProps">
      <button @click="unarchiveItem">{{ label }}</button>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const unarchiveItem = inject('unarchiveItem')
const isUnarchiving = inject('isUnarchiving')
const isArchived = inject('isArchived')
const isReading = inject('isReading')
const isLoading = inject('isLoading')

const label = computed(() => {
  if (isUnarchiving.value) return 'Unarchiving...'
  if (isReading.value) return 'Loading...'
  return 'Unarchive'
})
const slotProps = computed(() => {
  return {
    unarchiveItem,
    isUnarchiving: isUnarchiving.value,
    isReading: isReading.value,
    isLoading: isLoading.value,
  }
})
</script>
