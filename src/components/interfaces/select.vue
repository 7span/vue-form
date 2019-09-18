<template lang="pug">
.select.field-block
  select(
    :value="value"
    @change="input($event)")
    option(:value="null" disabled="disabled" selected) {{$attrs.placeholder || "Select Option"}}
    option(
      v-for="choice in preparedChoices" 
      :value="choice[choicesConfig.valueKey]") {{choice[choicesConfig.labelKey]}}
</template>

<script>
export default {
  name: "interface-select",
  mixins: [
    require("../../mixins/interface").default,
    require("../../mixins/choice").default
  ],
  methods: {
    /**
     * Emit the actual value as well as choice object
     * This helps to make decesion based on other values of choices
     */
    input(e) {
      let value = e.target.value;

      //Find the Object with all the values
      let choice = this.preparedChoices.find(
        choice => choice[this.choicesConfig.valueKey] == value
      );

      this.$emit("input", value, {
        ...choice
      });
    }
  }
};
</script>

