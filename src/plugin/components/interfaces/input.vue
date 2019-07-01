<template lang="pug">
.field__input
  input(
    :value="value"
    v-bind="{name,type,disabled,readonly,placeholder}"
    @input="$emit('input',$event.target.value)")
</template>

<script>
export default {
  name: "interface-input",
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
