# Introduction

Vue Form is a lightweight form helper that turns JSON-like field definitions into working CRUD-friendly forms. It ships in two flavors:

- Vue 3 options/slots package (v1.x) — registers a single `VForm` component with slot-driven rendering.
- Vue 2 options/slots package (v0.x) — API mirrors the Vue 3 options version for legacy apps.
- Vue 3 composition package (v3.x) — granular components (`VueForm`, `VueFormField`, etc.) with provide/inject state and action helpers.

## Installation

Use any package manager (npm shown here). All packages publish under `@7span/vue-form`; use version ranges to target the framework you need.

```bash
# Vue 3 (options API, slots)
npm install @7span/vue-form@^1

# Vue 2
npm install @7span/vue-form@^0

# Vue 3 (composition API bundle)
npm install @7span/vue-form@^3
```

## Quick start (Vue 3 options / slots)

```js
// main.js
import { createApp } from 'vue'
import VueForm from '@7span/vue-form'
import App from './App.vue'

createApp(App).use(VueForm).mount('#app')
```

```vue
<template>
  <VForm
    v-slot="{ values, saveItem, isSaving, errors }"
    :fields="['name', { name: 'email', value: 'hi@example.com' }]"
    :save="saveUser"
  >
    <input v-model="values.name" placeholder="Name" />
    <input v-model="values.email" placeholder="Email" />
    <p v-if="errors?.email">{{ errors.email }}</p>
    <button :disabled="isSaving" @click="saveItem">Save</button>
  </VForm>
</template>
```

## Quick start (Vue 2 options / slots)

```js
// main.js
import Vue from 'vue'
import VueForm from '@7span/vue-form'

Vue.use(VueForm)
```

```vue
<template>
  <VForm
    v-slot="{ values, saveItem, isSaving, errors }"
    :fields="['name', 'email']"
    :save="saveUser"
  >
    <input v-model="values.name" placeholder="Name" />
    <input v-model="values.email" placeholder="Email" />
    <p v-if="errors?.email">{{ errors.email }}</p>
    <button :disabled="isSaving" @click="saveItem">Save</button>
  </VForm>
</template>
```

## Quick start (Vue 3 composition bundle)

```js
// main.js
import { createApp } from 'vue'
import VueForm from '@7span/vue-form'
import App from './App.vue'

createApp(App).use(VueForm).mount('#app')
```

```vue
<template>
  <VueForm
    :fields="['name', { name: 'email', value: 'hi@example.com' }]"
    :read="readUser"
    :create="createUser"
    :update="updateUser"
  >
    <template #default="{ context }">
      <VueFormFields v-slot="{ values }">
        <label>Name</label>
        <input v-model="values.name" />
        <label>Email</label>
        <input v-model="values.email" />
      </VueFormFields>
      <VueFormCreate />
      <VueFormUpdate />
    </template>
  </VueForm>
</template>
```

## Package mapping

- Vue 3 options/slots: uses `componentPrefix` to expose `VForm` by default and provides `OPTIONS` via dependency injection.
- Vue 2 options/slots: same slot contract as Vue 3 options; uses `this.$set` internally for reactivity.
- Vue 3 composition bundle: exposes granular components and injects shared state/actions so you can compose any UI library.

Next, see **Configurations** for plugin options and **Components** for slot props and action helpers.
