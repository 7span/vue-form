<template lang="pug">
.field__input
  input(
    type="file"
    v-bind="{name,type,disabled,readonly,placeholder}"
    @change="$emit('input',$event.target.files)")
</template>

<script>
export default {
  name: "interface-file",
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
