<template lang="pug">
textarea.field__block(
  :value="value"
  @input="$emit('input',$event.target.value,$event.target.value)")
</template>

<script>
export default {
  name: "interface-textarea",
  mixins: [require("@/plugin/mixins/interface").default],
  props: {
    rows: {
      default: 5,
      type: Number
    }
  }
};
</script>
