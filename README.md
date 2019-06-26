# vue-form

Generates dynamic forms from JSON.

> This is Work in progress. Not recommended to use in production.

## Installation

```
npm install @7span/vue-form
```

## Usage

```html
<v-form v-model="values" :config="form.config" :fields="form.fields"></v-form>
```

## Props

### config

Config defines how to process the form. Configuration options are as below

| Option   | Default | Possible Values | What is does                          |
| -------- | ------- | --------------- | ------------------------------------- |
| defaults | {}      |                 | Default configuration for the fields. |
| endpoint | null    | Valid URL       | An endpoint to process data for CRUD  |

### fields

An array containing configuration object of the fields of form. The `key` of the object will be added as `name` of field. Each object can have below options.

| Option      | Default                    | Possible Values                   | What is does                                                                                                             |
| ----------- | -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| interface   | input                      | input,choice,select,file,textarea | Renders input elements. `choice` will render either `radio` or `checkbox`                                                |
| type        | text                       | text,email,radio,checkbox etc.    | Based on `input`, the type can be diffrent. I.e. the `input` can have `email`,`text`,`url` etc.                          |
| label       | Camel cased value of `key` | `String`                          | The label of the field                                                                                                   |
| placeholder | `null`                     | `String`                          | The placeholder. Will be added where supported.                                                                          |
| value       | `null`                     | `String`, `Array`                 | The default value to set whilte rendering form.                                                                          |
| messages    | {}                         | `Object`                          | See below.                                                                                                               |
| choices     | []                         | `Array`                           | Options for `radio`,`checkbox` & `select`                                                                                |
| design      | {}                         | `Object`                          | See below.                                                                                                               |
| hide        | null                       | `Function`                        | A function that defines when to hide the field. 1st parameters is an Object containing all the current values of fields. |
| repeater    | null                       | `Object`                          | If allow to add multiple values to field. See below for more options.                                                    |

#### messages

The object contains diffrent messages to show for validation and helper text.

| Option  | Default | Possible Values | What it does                                               |
| ------- | ------- | --------------- | ---------------------------------------------------------- |
| desc    | `null`  | `String`        | A helper message to show below field.                      |
| invalid | `null`  | `String`        | A warning message to show when field validation fails.     |
| valid   | `null`  | `String`        | A success message to show when field validation is truthy. |

#### design

| Option | Default | Possible Values    | What it does                                                                                       |
| ------ | ------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| col    | 12      | `Number` from 1-12 | How many cols to occupy in grid.                                                                   |
| grid   |         | `Number`           | When rendering field `choices` in radio/checkbox, how many items should be displayed in single row |

#### repeater

| Option | Default | Possible Values | What it does                      |
| ------ | ------- | --------------- | --------------------------------- |
| max    | null    | `Number`        | Maximum values to allowed to add. |
| min    | null    | `Number`        | Minimum values required.          |
