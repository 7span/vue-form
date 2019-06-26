<template lang="pug">
.field__group
  fields(:data="config.fields" :values="groupValue" @input="updateValue($event)")
</template>

<script>
export default {
  name: "interface-group",
  mixins: [require("@/plugin/mixins/interface").default],
  computed: {
    groupValue() {
      if (this.repeater === null) {
        return this.values[this.name] || {};
      } else {
        return this.values[this.name][this.repeater] || {};
      }
    }
  },
  methods: {
    /**
     * When group of fields is uses, we need to merge already existing values of other fields and
     * updated field to maintain same values across the form.
     */
    updateValue({ field, value }) {
      this.$emit("input", {
        ...this.groupValue,
        [field]: value
      });
    }
  }
};
</script>

<style lang="scss">
.field__group {
  .blocks {
    flex: 1 1 auto;
  }
}
</style>

