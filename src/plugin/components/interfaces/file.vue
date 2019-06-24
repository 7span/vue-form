<template lang="pug">
.field(:class="[stateClass]")
  label {{getLabel}} 
  input(
    type="file"
    v-bind="{name,type,placeholder}"
    @change="$emit('input',$event.target.files)")
  small(v-if="desc") {{desc}}
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
