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
  },

  data() {
    return {
      state: null,
    };
  },

  mounted() {
    this.setState();
    if (this.id) {
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

    mode() {
      if (this.id) {
        return "edit";
      }
      return "create";
    },

    isCreating() {
      return this.mode === "create";
    },

    isEditing() {
      return this.mode === "edit";
    },

    scopes() {
      return {
        mode: this.mode,
        isCreating: this.isCreating,
        isEditing: this.isEditing,
        state: this.state,
        saveItem: this.saveItem,
        getItem: this.getItem,
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
    },

    getItem() {
      this.get(this.id);
    },

    saveItem() {
      this.save(this.id, cloneDeep(this.state));
    },
  },
};
</script>
