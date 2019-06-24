<template lang="pug">
.field__input
  select(
    v-bind="{name}"
    :value="value"
    @change="$emit('input',$event.target.value)")
    option(:value="null" disabled="disabled" selected) {{placeholder || "Select Option"}}
    option(v-for="choice in choices" :value="choice.value") {{choice.label}}
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default]
};
</script>

