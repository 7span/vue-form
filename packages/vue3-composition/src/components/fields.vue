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

defineOptions({
  name: 'VueFormFields',
})

function hasError(fieldName) {
  return error.value?.fieldErrors[fieldName] != null
}

// TODO: Context object from <VueForm> already provides these values. Refactor to use that.
const slotProps = computed(() => {
  return {
    values: values.value,
    dirtyValues: dirtyValues.value,
    fieldErrors: error.value?.fieldErrors,
    hasError: hasError,
  }
})
</script>
