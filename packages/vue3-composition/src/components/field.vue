<template>
  <div class="vue-form__field">
    <slot v-bind="slotProps"></slot>
  </div>
</template>

<script setup>
import { inject, provide, computed } from 'vue'
import { isEqual } from 'lodash-es'

const error = inject('error')
const values = inject('values')
const addTouched = inject('addTouched')
const toggleDirty = inject('toggleDirty')
const normalizedFields = inject('normalizedFields')
const initialValues = inject('initialValues')

defineOptions({
  name: 'VueFormField',
})

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const field = normalizedFields.value.find((field) => field.name === props.name)

/**
 * Input events can come in two forms:
 * 1. Direct values from UI component libraries (e.g. value="some text")
 * 2. Native DOM Event objects from HTML elements (e.g. event.target.value)
 * This distinction requires handling both cases when processing input.
 */
function isEvent(value) {
  return (
    value &&
    typeof value === 'object' &&
    value.target !== undefined &&
    value.preventDefault !== undefined
  )
}

function onInput(data) {
  const value = isEvent(data) ? data.target.value : data
  updateValue(value)
}

function updateValue(value) {
  addTouched(props.name)
  values.value[props.name] = value
  const isDirty = !isEqual(initialValues.value[props.name], values.value[props.name])
  toggleDirty(props.name, isDirty)
}

const fieldError = computed(() => {
  return error.value?.fieldErrors[props.name]
})

const slotProps = computed(() => {
  return {
    error: fieldError.value,
    label: field.label,
    name: props.name,
    value: values.value?.[props.name],
    updateValue: updateValue,
    field: {
      modelValue: values.value?.[props.name],
      'onUpdate:modelValue': onInput,
    },
    nativeField: {
      value: values.value?.[props.name],
      onInput,
    },
  }
})


// Provide errorMessage for FieldError component
provide('errorMessage', fieldError)
</script>
