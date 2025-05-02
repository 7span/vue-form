<template>
  <div class="vue-form">
    <slot v-bind="slotProps"> </slot>
  </div>
</template>

<script setup>
import { inject, ref, computed, provide, watch, toRaw } from 'vue'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'

const props = defineProps({
  /**
   * Field configuration options:
   *
   * Array of strings: ['name', 'email']
   * - Creates fields with null default values
   *
   * Array of objects: [{name: 'email', value: 'hello@hello.com'}]
   * - Creates fields with specified default values
   *
   * Each field can be defined as:
   * - String: Field name only
   * - Object: {name, value, label} properties
   */
  fields: {
    type: Array,
    required: true,
  },
  itemId: {
    type: [String, Number],
  },
  create: {
    type: Function,
  },
  read: {
    type: Function,
  },
  update: {
    type: Function,
  },
  delete: {
    type: Function,
  },
  archive: {
    type: Function,
  },
  unarchive: {
    type: Function,
  },
})

const defaultFieldConfig = {
  name: null,
  value: null,
}

const globalOptions = inject('vueForm')

const values = ref({})

const isReading = ref(false)
const isCreating = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)
const isArchiving = ref(false)
const isUnarchiving = ref(false)
const isArchived = ref(false)
const error = ref()
const initialValues = ref({})
const touched = ref([])
const dirty = ref([])

const isLoading = computed(() => {
  return (
    isReading.value || isCreating.value || isUpdating.value || isDeleting.value || isArchiving.value
  )
})

const normalizedFields = computed(() => {
  return props.fields
    .map((field, index) => {
      const fieldType = typeof field
      if (fieldType === 'string') {
        return {
          ...defaultFieldConfig,
          name: field,
          value: null,
          label: useChangeCase(field, 'capitalCase'),
        }
      } else if (fieldType === 'object' && !Array.isArray(field)) {
        return {
          ...defaultFieldConfig,
          label: useChangeCase(field.name, 'capitalCase'),
          ...field,
        }
      } else {
        console.warn('Invalid field config provided for:', field)
        return null
      }
    })
    .filter((item) => item) // Removes invalid field configs
})

const isNewItem = computed(() => {
  return globalOptions.isNewItemCheck({ itemId: props.itemId })
})

const dirtyValues = computed(() => {
  return dirty.value.reduce((acc, key) => {
    acc[key] = values.value[key]
    return acc
  }, {})
})

const context = computed(() => {
  return {
    isNewItem: isNewItem.value,
    fields: props.fields,
    normalizedFields: normalizedFields.value,
    values: values.value,
    dirtyValues: values.value,
    error: error.value,
    itemId: props.itemId,
    isReading: isReading.value,
    isCreating: isCreating.value,
    isUpdating: isUpdating.value,
    isDeleting: isDeleting.value,
    isArchiving: isArchiving.value,
    isLoading: isLoading.value,
    isArchived: isArchived.value,
    touched: touched.value,
    dirty: dirty.value,
  }
})

function getDefaultValues() {
  return normalizedFields.value.reduce((acc, field) => {
    acc[field.name] = field.value
    return acc
  }, {})
}

function setValues(newValues) {
  dirty.value = []
  touched.value = []

  if (newValues) {
    Object.keys(newValues).forEach((key) => {
      values.value[key] = newValues[key]
    })
    initialValues.value = structuredClone(toRaw(values.value))
  } else {
    values.value = {}
  }
}

function setError(err) {
  if (!err) {
    error.value = null
    return
  }
  error.value = globalOptions.errorAdapter(err)
}

function onItemResponse(data) {
  isArchived.value = !isNewItem.value && globalOptions.isArchivedItemCheck(data)
  const { values } = data
  setValues(values)
}

function onItemError(err) {
  //Log JS Errors
  if (err.name == 'TypeError') {
    console.error(err)
  }
  setValues()
  setError(err)
}

function readItem() {
  isReading.value = true
  setError()
  return props
    .read(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isReading.value = false
    })
}

function createItem() {
  isCreating.value = true
  setError()
  return props
    .create(context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isCreating.value = false
    })
}

function updateItem() {
  isUpdating.value = true
  setError()
  return props
    .update(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isUpdating.value = false
    })
}

function deleteItem() {
  isDeleting.value = true
  setError()
  return props
    .delete(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isDeleting.value = false
    })
}

function archiveItem() {
  isArchiving.value = true
  setError()
  props
    .archive(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isArchiving.value = false
    })
}

function unarchiveItem() {
  isUnarchiving.value = true
  setError()
  props
    .unarchive(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isUnarchiving.value = false
    })
}

function addTouched(fieldName) {
  if (!touched.value.includes(fieldName)) {
    touched.value.push(fieldName)
  }
}

function toggleDirty(fieldName, isDirty) {
  if (isDirty && !dirty.value.includes(fieldName)) {
    dirty.value.push(fieldName)
  }
  if (!isDirty) {
    dirty.value = dirty.value.filter((item) => item !== fieldName)
  }
}

const slotProps = computed(() => {
  return {
    context: context.value,
    readItem,
    createItem,
    updateItem,
    deleteItem,
    archiveItem,
    unarchiveItem,
  }
})

provide('values', values)
provide('dirtyValues', dirtyValues)
provide('error', error)
provide('updateItem', updateItem)
provide('createItem', createItem)
provide('archiveItem', archiveItem)
provide('unarchiveItem', unarchiveItem)
provide('deleteItem', deleteItem)
provide('isUpdating', isUpdating)
provide('isCreating', isCreating)
provide('isReading', isReading)
provide('isArchiving', isArchiving)
provide('isUnarchiving', isUnarchiving)
provide('isDeleting', isDeleting)
provide('isLoading', isLoading)
provide('isNewItem', isNewItem)
provide('normalizedFields', normalizedFields)
provide('initialValues', initialValues)
provide('addTouched', addTouched)
provide('toggleDirty', toggleDirty)
provide('isArchived', isArchived)

function init() {
  if (!isNewItem.value) {
    readItem()
  } else {
    setValues(getDefaultValues())
  }
}

watch(() => props.itemId, init)
init()
</script>
