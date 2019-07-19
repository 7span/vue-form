<template lang="pug">
select.field__block(
  :value="value"
  @change="updateValue($event)")
  option(:value="null" disabled="disabled" selected) {{$attrs.placeholder || "Select Option"}}
  option(
    v-for="choice in preparedChoices" 
    :value="choice[choicesConfig.valueKey]") {{choice[choicesConfig.labelKey]}}
</template>

<script>
export default {
  name: "interface-select",
  mixins: [
    require("@/plugin/mixins/interface").default,
    require("@/plugin/mixins/choice").default
  ]
};
</script>

