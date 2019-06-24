<template lang="pug">
.field__input
  input(
    type="file"
    v-bind="{name,type,placeholder}"
    @change="$emit('input',$event.target.files)")
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
