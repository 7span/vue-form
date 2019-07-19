<template lang="pug">
.v-form

  slot(name="form--before")

  fields(
    :data="fields" 
    :values="values" 
    :valuesMeta="valuesMeta" 
    @input="updateValue($event)" 
    @input-meta="updateValueMeta($event)")

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
    value: {
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
      valuesMeta: {},
      valuesObj: {},
      localSlots: ["form--before", "form--after"]
    };
  },

  created() {
    if (this.fields) {
      let defaultValues = this.defaultValues(this.fields);
      //To make the values reactive
      for (var key in defaultValues) {
        this.$set(this.values, key, defaultValues[key]);
        this.$set(this.valuesMeta, key, defaultValues[key]);
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
    updateValue({ field, value, valueObj }) {
      this.$set(this.values, field, value);
      this.$set(this.valuesObj, field, valueObj);
      this.$emit("input", this.values);
      this.$emit("change", {
        field,
        value,
        valueObj,
        values: this.values,
        valuesObj: this.valuesObj
      });
    },
    updateValueMeta({ field, value }) {
      this.$set(this.valuesMeta, field, value);
      this.$emit("change-meta", {
        field,
        value,
        values: this.valuesMeta
      });
    },

    /**
     * Sets the value based on provided fields
     */
    setValue(field, value, repeaterIndex, values = this.values) {
      //Checks if the provided values object contains the field.
      //If not, it loops through all the keys and checks if the respective values is an object
      // If Object, it means the field is a group and may contain provided field.
      if (values.hasOwnProperty(field)) {
        //If repeaterIndex is provided, the field value is an array.
        if (repeaterIndex) {
          this.$set(values[field], repeaterIndex, value);
        } else {
          this.$set(values, field, value);
        }
        this.$emit("input", this.values);
      } else {
        for (var key in values) {
          let childValues = values[key];
          if (this.isObject(childValues)) {
            this.setValue(field, value, repeaterIndex, childValues);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
</style>


