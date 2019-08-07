<template lang="pug">
.v-form
  slot(name="form--start")

  fields(
    :fields="fields" 
    :value="values"
    :valueObj="valuesObj"
    :values="values" 
    :valuesObj="valuesObj"
    @input="updateValue($event)")

    //Passdown Slots
    template(v-for="slot in Object.keys($slots)" :slot="slot")
      slot(:name="slot")

  slot(name="form--end")

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
    updateValue({ field, value, valueObj, changed }) {
      this.$set(this.values, field, value);
      this.$set(this.valuesObj, field, valueObj);
      this.$emit("input", this.values);
      this.$emit("update:meta", this.valuesObj);

      //If value is not set by the setValue function
      // This check will avoid infinite iteration on change and set-value
      let changedActions = changed.map(item => item.action);
      if (!changedActions.includes("set-value")) {
        this.$emit("change", {
          changed,
          values: this.values,
          valuesObj: this.valuesObj
        });
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


