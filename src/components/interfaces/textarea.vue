<template lang="pug">
textarea.field-block(
  :value="value"
  @input="input(e)")
</template>

<script>
export default {
  name: "interface-textarea",
  mixins: [require("../../mixins/interface").default],
  props: {
    rows: {
      default: 5,
      type: Number
    }
  },
  methods: {
    input(e) {
      $emit("input", e.target.value, {
        value: e.target.value
      });
    }
  }
};
</script>
