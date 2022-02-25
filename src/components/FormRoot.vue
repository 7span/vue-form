<template>
  <div :id="nativeId">
    <slot v-if="state" v-bind="scopes"> </slot>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";

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
      error: null,
    };
  },

  mounted() {
    this.setState();
    if (this.isEditing) {
      this.getItem();
    }
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
              name: field,
              value: null,
            };
          } else if (fieldType === "object" && !Array.isArray(field)) {
            return field;
          } else {
            console.warn("Invalid field config provided at index: ", index);
            return null;
          }
        })
        .filter((item) => item); // Removes invalid field configs
    },

    values() {
      const res = {};
      this.serializedFields.forEach((field) => {
        if (field.parse) {
          res[field.name] = field.parse(this.state[field.name]);
        } else {
          switch (field.type) {
            case Number:
              res[field.name] = Number(this.state[field.name]);
              break;

            case String:
              res[field.name] = String(this.state[field.name]);
              break;

            default:
              res[field.name] = this.state[field.name];
              break;
          }
        }
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
      return this.isGetting || this.isSaving;
    },

    scopes() {
      return {
        mode: this.mode,
        isCreating: this.isCreating,
        isEditing: this.isEditing,
        state: this.state,
        values: this.values,
        saveItem: this.saveItem,
        getItem: this.getItem,
        setValue: this.setValue,
        isSaving: this.isSaving,
        isGetting: this.isGetting,
        isLoading: this.isLoading,
        error: this.error,
      };
    },
  },

  methods: {
    setState(values = {}) {
      const state = {};

      this.serializedFields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(values, field.name)) {
          state[field.name] = values[field.name];
        } else {
          state[field.name] = field.value;
        }
      });

      this.$set(this, "state", state);

      // Sync the state with parent component
      this.$emit("update:formState", this.state);
      this.$emit("update:formValues", this.values);
    },

    async getItem() {
      this.isGetting = true;
      this.error = null;
      this.get(this.id)
        .then((res) => {
          this.setState(res);
        })
        .catch((err) => {
          this.error = err;
          console.error(err);
        })
        .finally(() => {
          this.isGetting = false;
        });
    },

    async saveItem() {
      this.isSaving = true;
      this.error = null;

      this.save(this.id, cloneDeep(this.values))
        .then((res) => {
          this.setState(res);
        })
        .catch((err) => {
          this.error = err;
          console.error(err);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },

    setValue(key, value) {
      this.$set(this.state, key, value);
    },
  },
};
</script>
