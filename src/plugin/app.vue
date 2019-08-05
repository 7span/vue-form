<template lang="pug">
.v-form

  slot(name="form--before")

  fields(
    :fields="fields" 
    :value="values"
    :valueObj="valuesObj"
    :values="values" 
    :valuesObj="valuesObj"
    @input="updateValue($event)")

    slot(
      v-for="slot,slotName in slots" 
      :slot="slotName" 
      slot-scope="scope" 
      :name="slotName" 
      :scope="scope")

  slot(name="form--after")

</template>

<script>
export default {
  name: "v-form",
  mixins: [require("@/plugin/helper").default],
  props: {
    config: {
      type: Object
    },
    adapters: {
      type: Object
    },
    fields: {
      type: Object
    },
    meta: {
      type: Object
    }
  },

  provide() {
    return {
      CONFIG: this.config,
      ADAPTERS: this.adapters,
      SLOTS: this.$slots
    };
  },

  data() {
    return {
      values: {}, //Contains all the values of form.
      valuesObj: {}
    };
  },

  created() {
    if (this.fields) {
      let defaultValues = this.defaultValues(this.fields);
      //To make the values reactive
      for (var key in defaultValues) {
        this.$set(this.values, key, defaultValues[key]);
        this.$set(this.valuesObj, key, defaultValues[key]);
      }
      this.$emit("input", this.values);
    } else {
      console.error(
        "The fields are not defined. If you're getting it from async process make sure you start rendering form after the fields are populated."
      );
      return;
    }
  },

  computed: {
    slots() {
      return this.$slots;
    }
  },

  methods: {
    /**
     * Updates the value based on key and
     * emits all the values
     */
    updateValue({ field, value, valueObj, index, action, changed }) {
      this.$set(this.values, field, value);
      this.$set(this.valuesObj, field, valueObj);
      this.$emit("input", this.values);
      this.$emit("update:meta", this.valuesObj);

      //If value is not set by the setValue function
      // This check will avoid infinite iteration on change and set-value
      if (action != "set-value") {
        this.$emit("change", {
          field,
          action,
          value,
          valueObj,
          changed,
          index: index, //If repeater field, this value will be defined
          values: this.values,
          valuesObj: this.valuesObj
        });
      }
    },

    /**
     * NOT BEING USED
     * Sets the value based on provided fields
     */
    setValueX(field, value, repeaterIndex, values = this.values) {
      //Checks if the provided values object contains the field.
      //If not, it loops through all the keys and checks if the respective values is an object
      // If Object, it means the field is a group and may contain provided field.
      if (values.hasOwnProperty(field)) {
        this.$set(values, field, value);
        this.$emit("input", this.values);
        this.$emit("update:meta", this.valuesObj);
      } else {
        for (var key in values) {
          let childValues = values[key];
          if (this.isObject(childValues)) {
            this.setValue(field, value, repeaterIndex, childValues);
          }
          if (Array.isArray(childValues)) {
            this.setValue(
              field,
              value,
              repeaterIndex,
              childValues[repeaterIndex]
            );
          }
        }
      }
    },

    setConfig(data) {
      this.$root.$emit("v-form::set-config", data);
    },

    setValue(data) {
      this.$root.$emit("v-form::set-value", data);
    }
  }
};
</script>

<style lang="scss">
</style>


