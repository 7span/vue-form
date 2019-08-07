<template lang="pug">
.v-form
  slot(name="form--start" :value="value")

  fields(
    v-if="value"
    :fields="fields" 
    :value="value"
    :value-obj="valueObj"
    @input="updateValue($event)")

    //Passdown Slots
    template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
      slot(:name="slot" v-bind="scope")

  slot(name="form--end" :value="value")

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
      ADAPTERS: this.adapters
    };
  },

  data() {
    return {
      valueObj: {}
    };
  },

  created() {
    if (this.fields) {
      let defaultValues = this.defaultValues(this.fields);
      this.$emit("input", {...defaultValues});
      this.$set(this, "valueObj", {...defaultValues});
    } else {
      console.error(
        "The fields are not defined. If you're getting it from async process make sure you start rendering form after the fields are populated."
      );
      return;
    }
  },

  methods: {
    /**
     * Updates the value based on key and
     * emits all the values
     */
    updateValue(data) {
      this.$emit("input", data.value);
      this.$set(this, "valueObj", data.valueObj);
      this.$emit("update:meta", data.valueObj);

      //If value is not set by the setValue function
      // This check will avoid infinite iteration on change and set-value
      let changedActions = data.changed.map(item => item.action);
      if (!changedActions.includes("set-value")) {
        this.$emit("change", {
          changed: data.changed,
          value: this.value,
          valueObj: this.valueObj
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


