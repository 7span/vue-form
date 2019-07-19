<template lang="pug">
input.field__block(
  type="file"
  @change="$emit('input',$event.target.files)")
</template>

<script>
export default {
  name: "interface-file",
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
