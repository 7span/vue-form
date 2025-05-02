<template>
  <div class="vue-form__field">
    <slot v-bind="slotProps"></slot>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { isEqual } from 'lodash-es'

const error = inject('error')
const values = inject('values')
const addTouched = inject('addTouched')
const toggleDirty = inject('toggleDirty')
const normalizedFields = inject('normalizedFields')
const initialValues = inject('initialValues')

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const field = normalizedFields.value.find((field) => field.name === props.name)

function onInput(event) {
  addTouched(props.name)
  values.value[props.name] = event.target.value
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
    field: {
      name: props.name,
      value: values.value?.[props.name],
      onInput,
    },
  }
})
</script>
