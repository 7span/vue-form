<template>
  <div class="vue-form__fields">
    <slot v-bind="slotProps"> </slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const values = inject('values')
const dirtyValues = inject('dirtyValues')
const error = inject('error')

function hasError(fieldName) {
  return error.value?.fieldErrors[fieldName] != null
}

const slotProps = computed(() => {
  return {
    values: values.value,
    dirtyValues: dirtyValues.value,
    fieldErrors: error.value?.fieldErrors,
    hasError: hasError,
  }
})
</script>
