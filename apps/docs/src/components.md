# Components

## Vue 3 / Vue 2 (options & slots)

Both builds expose a single global component using the configured prefix (`VForm` by default).

### Props

- `fields` (Array, required): field definitions. Strings become `{ name, value: null }`; objects merge with defaults. Supports `in` and `out` transforms for coercion.
- `id` (String|Number): primary key; when present the form enters `edit` mode and runs `get`.
- `nativeId` (String): applied to the root div.
- `get(id)`, `save(id, values)`, `delete(id, values)`, `archive(id, values)`: async callbacks for CRUD.
- `formState`, `formValues` (sync v-model style): emitted via `update:formState` and `update:formValues`.

### Slot scope

`VForm` renders no UI. Everything is exposed through the default slot:

- `mode`, `isCreating`, `isEditing`
- `state` (raw in-state), `values` (after `out()` transform)
- Actions: `getItem`, `saveItem`, `deleteItem`, `archiveItem`, `setValue`, `reset`
- Flags: `isSaving`, `isGetting`, `isDeleting`, `isArchiving`, `isLoading`, `isArchived`
- Errors: `errors`, `error`, `hasError`, `fieldErrors`, `nonFieldErrors`

Example (Vue 3 options):

```vue
<VForm
  :fields="[{ name: 'title', value: '' }, 'description']"
  :get="fetchPost"
  :save="savePost"
  :id="postId"
  v-slot="{ values, saveItem, isSaving, errors }"
>
  <input v-model="values.title" placeholder="Title" />
  <textarea v-model="values.description" />
  <p v-if="errors?.title">{{ errors.title }}</p>
  <button :disabled="isSaving" @click="saveItem">Save</button>
</VForm>
```

Vue 2 usage is identical; reactivity uses `this.$set` internally.

## Vue 3 (composition bundle)

The composition build offers granular components and shared state via provide/inject.

### Core component

`VueForm` (or prefixed) accepts:

- `fields` (Array, required)
- `itemId` (String|Number)
- CRUD callbacks: `create(context)`, `read(itemId, context)`, `update(itemId, context)`, `delete(itemId, context)`, `archive(itemId, context)`, `unarchive(itemId, context)`

It exposes slot props:

- `context`: `isNewItem`, `normalizedFields`, `values`, `dirtyValues`, `error`, `itemId`, loading flags, `isArchived`, `touched`, `dirty`
- Actions: `readItem`, `createItem`, `updateItem`, `deleteItem`, `archiveItem`, `unarchiveItem`

### Field helpers

- `VueFormFields`: slot props `{ values, dirtyValues, fieldErrors, hasError }`.
- `VueFormField name="fieldName"`: slot props `{ error, label, name, value, updateValue, field, nativeField }`. Use `field` for Vue component v-model bindings, `nativeField` for plain inputs.

### Action helpers

Buttons with sensible loading labels; each exposes action and flags in its slot:

- `VueFormCreate`, `VueFormUpdate`, `VueFormDelete`, `VueFormArchive`, `VueFormUnarchive`
- `VueFormError`: renders nothing by default but surfaces normalized `error`.

### Example

```vue
<VueForm
  :fields="['name', { name: 'email', value: '' }]"
  :read="(id) => api.read(id)"
  :create="(ctx) => api.create(ctx.values)"
  :update="(id, ctx) => api.update(id, ctx.dirtyValues)"
>
  <template #default>
    <VueFormFields v-slot="{ values, fieldErrors }">
      <VueFormField name="name" v-slot="{ label, nativeField, error }">
        <label>{{ label }}</label>
        <input v-bind="nativeField" />
        <small v-if="error">{{ error }}</small>
      </VueFormField>
      <VueFormField name="email" v-slot="{ nativeField, error }">
        <input type="email" v-bind="nativeField" />
        <small v-if="error">{{ error }}</small>
      </VueFormField>
    </VueFormFields>
    <VueFormCreate />
    <VueFormUpdate />
  </template>
</VueForm>
```

