<template lang="pug">
.field(:class="[stateClass]")
  label {{getLabel}}
  select(
    v-bind="{name}"
    v-model="val"
    @change="$emit('input',val)")
    option(:value="null" disabled="disabled" selected) {{placeholder || "Select Option"}}
    option(v-for="choice in choices" :value="choice.value") {{choice.label}}

  small(v-if="desc") {{desc}}
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>

