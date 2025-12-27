# Getting Started

## Installation

::: code-group

```sh [npm]
npm install @7span/vue-form
```

```sh [pnpm]
pnpm add @7span/vue-form
```

```sh [yarn]
yarn add @7span/vue-form
```

:::

## Configuring the Plugin

Before using VueForm in your components, you can configure global options like following:
::: code-group

```js [main.js]
import { createApp } from "vue";
import VueForm from "@7span/vue-form";
import axios from "axios";
import App from "./App.vue";

const app = createApp(App);

app.use(VueForm, {
  componentPrefix: "",
  isNewItemCheck: (context) => {
    const { itemId } = context;
    return itemId === "+";
  },
  isArchivedItemCheck: (response) => {
    return response.isArchived == true;
  },
  errorAdapter: (error) => {
    return {
      name: error.name || "Unknown Error",
      message: error.message || "There was an unknown error. Please try again.",
      fieldErrors: error.errors || {},
    };
  },
});

app.mount("#app");
```

:::

## Using in Components

Once the plugin is configured, you can use the `<VueForm>` component anywhere in your app to power CRUDs.

::: code-group

```vue
<template>
  <VueForm
    :fields="fields"
    :create="create"
    :read="read"
    :update="update"
    :delete="del"
    :archive="archive"
    :unarchive="unarchive"
    v-model="values"
    :item-id="route.params.itemId"
  >
    <template #default="{ context }">
      <VueFormError />
      <VueFormFields>
        <template #default="{ values, dirtyValues }">
          <VueFormField name="name" v-slot="{ nativeField, label, error }">
            <label>{{ label }}</label>
            <input type="text" v-bind="nativeField" />
            <p v-if="error">Error: {{ error }}</p>
          </VueFormField>
        </template>
      </VueFormFields>

      <VueFormCreate />
      <VueFormUpdate />
      <VueFormArchive />
      <VueFormUnarchive />
      <VueFormDelete />
    </template>
  </VueForm>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const values = ref(null);

const fields = ref([
  {
    name: "name",
    value: "This is Sparta!",
  },
]);

const create = (context) => {
  // API Call to create the item
  return {
    values,
    isArchived,
  };
};

const read = (itemId) => {
  // API Call to get data
  return {
    values,
    isArchived,
  };
};

const update = (itemId, context) => {
  // API Call to update the data
  return {
    values,
    isArchived,
  };
};

const del = (itemId, context) => {
  // API Call to delete the item
  return {};
};

const archive = (itemId, context) => {
  // API Call to archive the item
  return {
    values,
    isArchived,
  };
};

const unarchive = (itemId, context) => {
  // API Call to unarchive the item
  return {
    values,
    isArchived,
  };
};
</script>
```

::: tip
VueForm does not render your UI. It only gives you the data and state you need — your components stay 100% in control of layout and design.
:::

Let's break down what VueForm offers - configuration options, the components, and props that power your CRUD.
