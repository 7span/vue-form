# vue-form

### Vue 3

Use version 2.x.x

### Vue 2

Use version 1.x.x

Generates dynamic forms from JSON.

> 🚧 This is Work in progress. Not recommended to use in production.

## 📦 Installation

```
npm install @7span/vue-form
```

---

## ✨ Usage

```html
<v-form
    ref="vForm"
    v-model="values"
    :config="form.config"
    :fields="form.fields"
></v-form>
```

---

## ⚙️ Props

### 1. config

Config defines how to process the form. Configuration options are as below

| Option   | Default | Possible Values | What is does                          |
| -------- | ------- | --------------- | ------------------------------------- |
| defaults | {}      |                 | Default configuration for the fields. |
| endpoint | null    | Valid URL       | An endpoint to process data for CRUD  |

### 2. fields

An array containing configuration object of the fields of form. The `key` of the object will be added as `name` of field. Each object can have below options.

| Option      | Default                    | Possible Values                   | What is does                                                                                                                            |
| ----------- | -------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| interface   | input                      | input,choice,select,file,textarea | Renders input elements. `choice` will render either `radio` or `checkbox`. [Know more.](#interfaces)                                    |
| type        | text                       | text,email,radio,checkbox etc.    | Based on `input`, the type can be diffrent. I.e. the `input` can have `email`,`text`,`url` etc.                                         |
| label       | Camel cased value of `key` | String                            | The label of the field                                                                                                                  |
| placeholder | `null`                     | String                            | The placeholder. Will be added where supported.                                                                                         |
| value       | `null`                     | String, Array                     | The default value to set whilte rendering form. If `repeater` is set, provide an array of values.                                       |
| hide        | `false`                    | Boolean                           | If the field is hidden.                                                                                                                 |
| choices     | `[]`                       | Array                             | Options for `radio`,`checkbox` & `select`. [Know more.](#choices)                                                                       |
| messages    | `null`                     | Object                            | [Know more.](#messages)                                                                                                                 |
| design      | `{}`                       | Object                            | [Know more.](#design)                                                                                                                   |
| repeater    | `null`                     | Object                            | If allow to add multiple values to field. [Know more.](#repeater)                                                                       |
| before      | `null`                     | String                            | Value to prepend in Field Group                                                                                                         |
| after       | `null`                     | String                            | Value to append in Field Group                                                                                                          |
| fields      | `null`                     | Object                            | If `interface` is set to `group`, you can provide `fields` under this which follows same structure as `fields` prop. This is recursive. |

#### `interfaces`

List of possible interfaces to add into field configuration.

| Name     | Types                                 | Desc                                                                                |
| -------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| input    | text,email,url,[any valid input type] |                                                                                     |
| choice   | radio, checkbox                       |                                                                                     |
| select   | NA                                    |                                                                                     |
| file     | NA                                    |                                                                                     |
| textarea | NA                                    |                                                                                     |
| group    | NA                                    | You can group fields under one with this. This will recursively create form fields. |

#### `choices`

Choices is an array of objects with below keys.

| Option | Default | Possible Values    | What it does      |
| ------ | ------- | ------------------ | ----------------- |
| label  | `null`  | `String`           | The display text. |
| value  | `null`  | `String` ,`Number` | The value.        |

#### `messages`

The object contains diffrent messages to show for validation and helper text.

| Option  | Default | Possible Values | What it does                                               |
| ------- | ------- | --------------- | ---------------------------------------------------------- |
| desc    | `null`  | `String`        | A helper message to show below field.                      |
| invalid | `null`  | `String`        | A warning message to show when field validation fails.     |
| valid   | `null`  | `String`        | A success message to show when field validation is truthy. |

#### `design`

| Option | Default | Possible Values    | What it does                                                                                       |
| ------ | ------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| col    | 12      | `Number` from 1-12 | How many cols to occupy in grid.                                                                   |
| grid   |         | `Number`           | When rendering field `choices` in radio/checkbox, how many items should be displayed in single row |

#### `repeater`

| Option | Default | Possible Values | What it does                      |
| ------ | ------- | --------------- | --------------------------------- |
| max    | null    | `Number`        | Maximum values to allowed to add. |
| min    | null    | `Number`        | Minimum values required.          |

---

## 🏁 Events

### 1. change

The change event exposes following values as an object.

| key       | Type   | What it contains                                                                                                  |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| changed   | Array  | An array of changed values. It will only contain multiple values if the fields are grouped. [Know more](#changed) |
| values    | Object | All the values in current state.                                                                                  |
| valuesObj | Object | All the values with metadata in current state.                                                                    |

#### `changed`

The `changed` object contains following keys.

-   **action** : What action taken which triggered the change event.
    Possible values are:
    -   **input**: When the field value is updated.
    -   **child-input**: In a case of grouped fields, if the child value is updated, the parent action will be this.
    -   **repeater-add**: When a new repeater field is added.
    -   **repeater-remove**: When a new repeater field is removed.
-   **field**: Name of the field.
-   **value**: Value of the field.
-   **valueObj**: Value of the field with metadata.
-   **index**: If the field is repeater one, the index of affected repeater item.

---

## 🕳 Slots

-   form--start
-   form--end
-   field--before--{field-name}
-   field--before--{field-name}--{index}
-   field--after--{field-name}
-   field--after--{field-name}--{index}
-   field--start--{field-name}
-   field--start--{field-name}--${index}
-   field--end--{field-name}
-   field--end--{field-name}--${index}
-   repeater--add
-   repeater--remove

---

## ⚔️ Methods

### 1. setValue

You can set the value directly from your component by calling this function.

```js
this.$refs.vForm.setValue({
    field: "e_company",
    value: "7Span Tech",
    index: 1, // Required only if you want to set value at specific index in repeater fields.
});
```

### 2. setConfig

You can modify the config from your component by calling this function.

```js
this.$refs.vForm.setConfig({
    field: "e_company",
    key: "after", // The configuration key as provided in fields
    value: "#", // The value of the configuration.
    index: 1, // Required only if you want to set value at specific index in repeater fields.
});
```
