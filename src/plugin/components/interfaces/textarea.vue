<template lang="pug">
.field__input
  textarea(
    v-bind="{name,type,placeholder,rows}"
    :value="value"
    @input="$emit('input',$event.target.value)")
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default],
  props: {
    rows: {
      default: 5,
      type: Number
    }
  }
};
</script>
