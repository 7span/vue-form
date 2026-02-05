<template>
  <div class="vue-form">
    <slot v-bind="slotProps"> </slot>
  </div>
</template>

<script setup>
import { inject, ref, computed, provide, watch, toRaw } from 'vue'

defineOptions({
  name: 'VueForm',
})

const props = defineProps({
  schema: {
    type: Object,
  },
  createSchema: {
    type: Object,
  },
  updateSchema: {
    type: Object,
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
  meta: {
    type: Object,
  },
  validateSchema: {
    type: Function,
  },
  schemaToFields: {
    type: Function,
  },
  errorAdapter: {
    type: Function,
  },
  resolveMode: {
    type: Function,
  },
})

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
const validateSchema = props.validateSchema || globalOptions.validateSchema
const errorAdapter = props.errorAdapter || globalOptions.errorAdapter
const resolveMode = props.resolveMode || globalOptions.resolveMode
const schemaToFields = props.schemaToFields || globalOptions.schemaToFields

const isLoading = computed(() => {
  return (
    isReading.value || isCreating.value || isUpdating.value || isDeleting.value || isArchiving.value
  )
})

const mode = computed(() => {
  return resolveMode({ itemId: props.itemId })
})

const isCreateMode = computed(() => {
  return mode.value === 'CREATE'
})

const isUpdateMode = computed(() => {
  return mode.value === 'UPDATE'
})

const fields = computed(() => {
  let targetSchema
  if (props.createSchema && isCreateMode.value) {
    targetSchema = props.createSchema
  } else if (props.updateSchema && isUpdateMode.value) {
    targetSchema = props.updateSchema
  } else {
    targetSchema = props.schema
  }
  return schemaToFields(targetSchema)
})

const dirtyValues = computed(() => {
  return dirty.value.reduce((acc, key) => {
    acc[key] = values.value[key]
    return acc
  }, {})
})

const context = computed(() => {
  return {
    mode: mode.value,
    schema: props.schema,
    fields: fields.value,
    createSchema: props.createSchema,
    updateSchema: props.updateSchema,
    values: values.value,
    dirtyValues: dirtyValues.value,
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
    meta: props.meta,
    isCreateMode: isCreateMode.value,
    isUpdateMode: isUpdateMode.value,
  }
})

function getDefaultValues() {
  return fields.value.reduce((acc, field) => {
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

    values.value = {
      ...getDefaultValues(),
      ...toRaw(values.value),
    }

    //TODO: Why?
    initialValues.value = structuredClone(toRaw(values.value))
  }
}

function setError(err) {
  if (!err) {
    error.value = null
    return
  }
  error.value = errorAdapter(err, context.value)
}

function onItemResponse(data) {
  isArchived.value = isUpdateMode.value && globalOptions.isArchivedItemCheck(data)
  const { values } = data
  setValues(values)
}

function onItemError(err) {
  //Log JS Errors
  if (err.name == 'TypeError') {
    console.error(err)
  }
  setError(err)
}

function readItem() {
  isReading.value = true
  setError()
  return props
    .read(context.value)
    .then(onItemResponse)
    .catch(onItemError)
    .finally(() => {
      isReading.value = false
    })
}

function createItem() {
  isCreating.value = true
  return validateSchema(context.value)
    .then(() => props.create(context.value).then(onItemResponse))
    .catch(onItemError)
    .finally(() => {
      isCreating.value = false
    })
}

async function updateItem() {
  isUpdating.value = true
  return validateSchema(context.value)
    .then(() => props.update(context.value).then(onItemResponse))
    .catch(onItemError)
    .finally(() => {
      isUpdating.value = false
    })
}

function deleteItem() {
  isDeleting.value = true
  setError()
  return props
    .delete(context.value)
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
    .archive(context.value)
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
    .unarchive(context.value)
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

provide('fields', fields)
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
provide('initialValues', initialValues)
provide('addTouched', addTouched)
provide('toggleDirty', toggleDirty)
provide('isArchived', isArchived)
provide('isCreateMode', isCreateMode)
provide('isUpdateMode', isUpdateMode)

function init() {
  if (isUpdateMode.value) {
    readItem()
  } else {
    setValues(getDefaultValues())
  }
}

watch(() => props.itemId, init)
init()
</script>
