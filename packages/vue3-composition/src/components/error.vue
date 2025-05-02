<template>
  <div v-if="error" class="vue-form__error">
    <slot v-bind="slotProps">
      <pre>{{ error }}</pre>
    </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const error = inject('error')

const slotProps = computed(() => {
  return {
    error: error.value,
  }
})
</script>
