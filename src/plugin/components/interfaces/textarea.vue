<template lang="pug">
.field(:class="[stateClass]")
  label {{getLabel}} 
  textarea(
    v-bind="{name,type,placeholder,rows}"
    v-model="val"
    @input="$emit('input',val)")
  small(v-if="desc") {{desc}} 
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>
