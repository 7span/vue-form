<template>
  <div v-if="isCreateMode" class="vue-form__create">
    <slot v-bind="slotProps">
      <button @click="createItem">{{ label }}</button>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const createItem = inject('createItem')
const isCreating = inject('isCreating')
const isReading = inject('isReading')
const isCreateMode = inject('isCreateMode')
const isLoading = inject('isLoading')

defineOptions({
  name: 'VueFormCreate',
})

const label = computed(() => {
  if (isCreating.value) return 'Creating...'
  if (isReading.value) return 'Loading...'
  return 'Create'
})
const slotProps = computed(() => {
  return {
    createItem,
    isCreating: isCreating.value,
    isReading: isReading.value,
    isLoading: isLoading.value,
  }
})
</script>
