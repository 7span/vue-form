<template lang="pug">
input.field__block(
  :type="$attrs.type"
  :value="value"
  @input="updateValue($event)")
</template>

<script>
export default {
  name: "interface-input",
  mixins: [require("@/plugin/mixins/interface").default],
  methods: {
    updateValue(event) {
      let value = event.target.value;
      if (this.$attrs.type == "number") {
        value = parseFloat(value);
      }
      this.$emit("input", value, value);
    }
  }
};
</script>
