<template lang="pug">
.field__input
  input(
    v-bind="{name,type,placeholder}"
    :value="value"
    @input="$emit('input',$event.target.value)")
</template>

<script>
export default {
  name: "interface-input",
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
