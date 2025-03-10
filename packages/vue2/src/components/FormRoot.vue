<template>
  <div :id="nativeId">
    <slot v-if="state" v-bind="scopes"> </slot>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";
import { warn } from "../utils";

const defaultFieldConfig = {
  name: null,
  value: null,
  type: null,
  in: (value) => value, // Before setting the value in the state
  out: (value) => value, // Before getting the value out of the state
};

export default {
  props: {
    /**
     * Possible config
     * ['name','email'] Creates fields with null values
     * [{name:'email',value:'hello@hello.com'}] Creates field with default value
     */
    fields: {
      type: Array,
      required: true,
    },

    id: {
      type: [String, Number],
    },

    nativeId: String,

    get: {
      type: Function,
    },

    save: {
      type: Function,
    },

    delete: {
      type: Function,
    },

    archive: {
      type: Function,
    },

    // State represents the values binded with DOM
    formState: {
      type: Object,
    },

    // Values represents the actual value after parsing data from DOM
    formValues: {
      type: Object,
    },
  },

  data() {
    return {
      state: null,
      isGetting: false,
      isSaving: false,
      isDeleting: false,
      isArchiving: false,
      isArchived: false,
      errors: {},
      error: null,
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    /**
     * Serializing the fields creats the same format for
     * all the field config provided in fields prop.
     */
    serializedFields() {
      return this.fields
        .map((field, index) => {
          const fieldType = typeof field;

          if (fieldType === "string") {
            return {
              ...defaultFieldConfig,
              name: field,
              value: null,
            };
          } else if (fieldType === "object" && !Array.isArray(field)) {
            return {
              ...defaultFieldConfig,
              ...field,
            };
          } else {
            warn("Invalid field config provided at index", index);
            return null;
          }
        })
        .filter((item) => item); // Removes invalid field configs
    },

    fieldErrors() {
      return Object.keys(this.errors)
        .filter((name) => this.hasField(name))
        .reduce((result, name) => {
          result[name] = this.errors[name];
          return result;
        }, {});
    },

    nonFieldErrors() {
      return Object.keys(this.errors)
        .filter((name) => !this.hasField(name))
        .reduce((result, name) => {
          result[name] = this.errors[name];
          return result;
        }, {});
    },

    values() {
      const res = {};
      this.serializedFields.forEach((field) => {
        res[field.name] = field.out(this.state[field.name]);
      });
      return res;
    },

    mode() {
      if (this.id == null) {
        return "create";
      }
      return "edit";
    },

    isCreating() {
      return this.mode === "create";
    },

    isEditing() {
      return this.mode === "edit";
    },

    isLoading() {
      return this.isGetting || this.isSaving || this.isDeleting;
    },

    scopes() {
      return {
        mode: this.mode,
        isCreating: this.isCreating,
        isEditing: this.isEditing,
        state: this.state,
        values: this.values,
        getItem: this.getItem,
        saveItem: this.saveItem,
        deleteItem: this.deleteItem,
        archiveItem: this.archiveItem,
        setValue: this.setValue,
        reset: this.reset,
        isSaving: this.isSaving,
        isGetting: this.isGetting,
        isDeleting: this.isDeleting,
        isArchiving: this.isArchiving,
        isLoading: this.isLoading,
        isArchived: this.isArchived,
        errors: this.errors || {},
        error: this.error,
        hasError: this.hasError,
        fieldErrors: this.fieldErrors,
        nonFieldErrors: this.nonFieldErrors,
      };
    },

    hasError() {
      return this.error || Object.keys(this.errors).length > 0;
    },
  },

  methods: {
    init() {
      this.setState();

      if (this.isEditing) {
        this.getItem();
      }
    },

    refresh(payload) {
      this.getItem(payload);
    },

    reset() {
      this.setState();
      this.setErrors();
    },

    hasField(name) {
      return this.serializedFields.find((field) => field.name === name);
    },

    setState(values = {}) {
      const state = {};

      this.serializedFields.forEach((field) => {
        let value;
        if (Object.prototype.hasOwnProperty.call(values, field.name)) {
          value = values[field.name];
        } else {
          value = field.value;
        }
        state[field.name] = field.in(value);

        // For processing out method, for example converting String to Number after getting data from API
        // below code Closes Issue #34
        state[field.name] = field.out(value);
      });

      this.$set(this, "state", state);

      // Sync the state with parent component
      this.$emit("update:formState", this.state);
      this.$emit("update:formValues", this.values);
    },

    async getItem(payload) {
      this.isGetting = true;
      this.setErrors();
      return this.get(this.id, payload)
        .then((res) => {
          if (this.validateIn(res)) {
            if (res.archivedAt) this.isArchived = true;
            else this.isArchived = false;

            this.setState(res);
          }
          return res;
        })
        .catch((err) => {
          this.setErrors(err);
        })
        .finally(() => {
          this.isGetting = false;
        });
    },

    async saveItem() {
      this.isSaving = true;
      this.setErrors();

      return this.save(this.id, cloneDeep(this.values))
        .then((res) => {
          if (this.validateIn(res)) {
            this.setState(res);
          }
          return res;
        })
        .catch((err) => {
          this.setErrors(err);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },

    async deleteItem() {
      this.isDeleting = true;
      this.setErrors();

      return this.delete(this.id, cloneDeep(this.values))
        .catch((err) => {
          this.setErrors(err);
        })
        .finally(() => {
          this.isDeleting = false;
        });
    },

    async archiveItem() {
      this.isArchiving = true;
      this.setErrors();

      return this.archive(this.id, cloneDeep(this.values))
        .catch((err) => {
          this.setErrors(err);
        })
        .finally(() => {
          this.isArchiving = false;
        });
    },

    setValue(key, value) {
      this.$set(this.state, key, value);
    },

    setErrors(errors) {
      if (errors) {
        const { fields, message } = this.OPTIONS.errorAdapter(errors);
        this.errors = fields;
        this.error = message;
        if (Object.keys(fields).length > 0) {
          // eslint-disable-next-line
          console.error(message, fields);
        }
      } else {
        this.errors = {};
        this.error = null;
      }
    },

    validateIn(res) {
      if (typeof res !== "object" || Array.isArray(res)) {
        warn("Invalid input/errors received", res);
        return false;
      }
      return true;
    },
  },
};
</script>
