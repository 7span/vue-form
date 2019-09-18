<template lang="pug">
input.field-block(
  type="file"
  @change="input($event)")
</template>

<script>
export default {
  name: "interface-file",
  mixins: [require("../../mixins/interface").default],
  methods: {
    input(e) {
      this.$emit("input", e.target.files, {
        value: e.target.files
      });
    }
  }
};
</script>
