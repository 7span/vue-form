# `<VueFormField>`

Renders an individual form field and exposes field-specific state and methods through slots. Use the name prop to specify which field to render, then bind the provided context to your custom input components.

```vue
<template>
  <VueForm>
    <template #default="{...}">
      <VueFormFields>
        <VueFormField
          name="email"
          #default="{
            error,
            label,
            name,
            value,
            updateValue,
            model,
            nativeModel,
          }"
        >
          <label>{{ label }}</label>
          <input type="email" v-bind="nativeModel" />
          <span v-if="error">{{ error }}</span>
        </VueFormField>
      </VueFormFields>
    </template>
  </VueForm>
</template>
```

This approach gives you complete control over how each field is rendered while VueForm handles state management automatically.

## Props

### `name`

- Type: `String`

The field name from your fields configuration

## Events

There are no events added at the moment.

## Slots

### `default`

The only slot available in `<VueFormField>` is `default`. It exposes a set of scoped variables that you can access.

#### Slot Props

| Key         | Description                                                                                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error       | `String` <br/> The field specific error                                                                                                                                             |
| label       | `String` <br/> The display label for the field. If the field is defined as a string (e.g., 'first_name'), the label is automatically generated in CapitalCase (e.g., "First Name"). |
| name        | `String`                                                                                                                                                                            |
| value       | `String` <br/> The current value of the field                                                                                                                                       |
| updateValue | `Function` <br/> You can manually set value with this function                                                                                                                      |
| model       | `Object` <br/> Use this to bind the v-model on custom input components                                                                                                              |
| nativeModel | `Object` <br/> Use this to bind the v-model on native input elements                                                                                                                |
