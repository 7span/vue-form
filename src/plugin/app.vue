<template lang="pug">
.v-form
  fields(:data="fields" :values="values" @input="updateValue($event)")
</template>

<script>
export default {
  name: "v-form",

  props: {
    config: {
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
      CONFIG: this.config
    };
  },

  data() {
    return {
      values: {} //Contains all the values of form.
    };
  },

  created() {
    this.setValues();
  },

  methods: {
    /**
     * Updates the value based on key and
     * emits all the values
     */
    updateValue({ field, value }) {
      //Check if value is already set
      this.$set(this.values, field, value);
      this.$emit("input", this.values);
    },

    /**
     * Sets the defaults values based on config.
     */
    setValues() {
      for (var field in this.fields) {
        let defaultValue = null;
        let fieldConfig = this.fields[field];
        //If the repeater mode is on, the default value should be blank array
        if (fieldConfig.repeater) {
          defaultValue = [];
        }
        this.$set(this.values, field, fieldConfig.value || defaultValue);
      }
      this.$emit("input", this.values);
    }
  }
};
</script>

<style lang="scss">
</style>


