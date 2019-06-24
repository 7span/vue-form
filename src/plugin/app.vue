<template lang="pug">
.v-form
  .blocks
    .block(
      v-for="fieldConfig,fieldName in fields"
      v-show="fieldConfig.hide? fieldConfig.hide(values) : true"
      :class="[colClass(fieldConfig)]")
      interface(
        :name="fieldName"
        :config="fieldConfig"
        :value="values[fieldName]" 
        @input="updateValue(fieldName,$event)")
</template>

<script>
export default {
  components: {
    Interface: require("@/plugin/components/interface.vue").default
  },

  props: {
    config: {
      type: Object
    },
    fields: {
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
    updateValue(field, value) {
      //Check if value is already set
      if (this.values[field]) {
        this.values[field] = value;
      } else {
        this.$set(this.values, field, value);
      }
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
    },

    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    colClass(field) {
      let col =
        (field.design && field.design.col) ||
        (this.config.defaults.design && this.config.defaults.design.col) ||
        12;
      return `is-${col}`;
    }
  }
};
</script>

<style lang="scss">
</style>


