<template lang="pug">
.v-form
  slot(name="form--start" :value="value")

  group(
    key="v-form"
    :name="name"
    :config="config" 
    :value="value"
    @input="updateValue(arguments)")

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
    settings: {
      type: Object
    },
    adapters: {
      type: Object
    },
    fields: {
      type: Object
    },
    metaValue: {
      type: Object
    },
    value: {
      type: Object
    }
  },

  data() {
    return {
      name: "v-form",
      config: {
        fields: this.fields
      }
    };
  },

  provide() {
    return {
      SETTINGS: this.settings,
      ADAPTERS: this.adapters
    };
  },

  created() {
    // if (this.fields) {
    //   let defaultValues = this.defaultValues(this.fields);
    //   this.$emit("input", { ...defaultValues });
    // } else {
    //   console.error(
    //     "The fields are not defined. If you're getting it from async process make sure you start rendering form after the fields are populated."
    //   );
    //   return;
    // }
  },

  methods: {
    /**
     * Updates the value based on key and
     * emits all the values
     */
    updateValue(args) {
      this.$emit("input", args[0]);
      this.$emit("update:meta-value", args[1][args[1].length - 1].metaValue);

      // If value is not set by the setValue function
      // This check will avoid infinite iteration on change and set-value
      let changedActions = args[1].map(item => item.action);
      if (!changedActions.includes("set-value")) {
        this.$emit("change", args[1]);
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


