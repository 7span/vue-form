<template>
  <div class="vue-form">
    <slot v-bind="slotProps"> </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  /**
   * Possible config
   * ['name','email'] Creates fields with null values
   * [{name:'email',value:'hello@hello.com'}] Creates field with default value
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
})

const defaultFieldConfig = {
  name: null,
  value: null,
}

const globalOptions = inject('vueForm')

const values = defineModel('values', {
  default: () => {},
})

const isReading = ref(false)
const isCreating = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)
const isArchiving = ref(false)
const isArchived = ref(false)
const error = ref()

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
        }
      } else if (fieldType === 'object' && !Array.isArray(field)) {
        return {
          ...defaultFieldConfig,
          ...field,
        }
      } else {
        console.warn('Invalid field config provided for:', field)
        return null
      }
    })
    .filter((item) => item) // Removes invalid field configs
})

const context = computed(() => {
  return {
    fields: props.fields,
    normalizedFields: normalizedFields.value,
    values: values.value,
    error: error.value,
    itemId: props.itemId,
    isReading: isReading.value,
    isCreating: isCreating.value,
    isUpdating: isUpdating.value,
    isDeleting: isDeleting.value,
    isArchiving: isArchiving.value,
    isLoading: isLoading.value,
    isArchived: isArchived.value,
  }
})

function setInitialValues(values = {}) {
  const allValues = {}

  normalizedFields.value.forEach((field) => {
    let value
    // If value is provided in the values object, use it, otherwise use the default value
    if (Object.prototype.hasOwnProperty.call(values, field.name)) {
      value = values[field.name]
    } else {
      value = field.value
    }
    allValues[field.name] = value
  })
  values.value = allValues
}

function setError(err) {
  if (!err) {
    error.value = null
    return
  }
  error.value = globalOptions.errorAdapter(err)
}

function onItemResponse(data) {
  isArchived.value = globalOptions.isArchivedCheck(data)
  const { values } = data
  setInitialValues(values)
}

function onItemError(err) {
  setError(err)
}

function readItem() {
  isReading.value = true
  setError()
  props
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
  props
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
  props
    .create(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isUpdating.value = false
    })
}

function deleteItem() {
  isDeleting.value = true
  setError()
  props
    .create(props.itemId, context.value)
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
    .create(props.itemId, context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isArchiving.value = false
    })
}

const slotProps = computed(() => {
  return {
    context: context.value,
    readItem,
    createItem,
    updateItem,
    deleteItem,
    archiveItem,
  }
})

setInitialValues()
const isNewItem = globalOptions.isNewItemCheck(context.value)
if (!isNewItem) {
  readItem()
}
</script>
