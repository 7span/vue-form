<template lang="pug">
input.field-block(
  :type="$attrs.type"
  :value="value"
  @input="input($event)")
</template>

<script>
export default {
  name: "interface-input",
  mixins: [require("../../mixins/interface").default],
  methods: {
    input(e) {
      let value = e.target.value;
      if (this.$attrs.type == "number") {
        value = parseFloat(value);
      }
      this.$emit("input", value, {
        value: value
      });
    }
  }
};
</script>
