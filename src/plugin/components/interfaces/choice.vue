<template lang="pug">
.field__input
  .grid(:class="`is-${design.grid}`") 
    .field(
      :class="[typeClass]" 
      v-for="choice in preparedChoices")
      input(
        :type="$attrs.type"
        :value="choice[choicesConfig.valueKey]" 
        v-model="val"
        @change="$emit('input',val)"
        :id="uId(choice)")
      label(:for="uId(choice)") {{choice[choicesConfig.labelKey]}}
</template>

<script>
export default {
  name: "interface-choice",
  mixins: [
    require("@/plugin/mixins/interface").default,
    require("@/plugin/mixins/choice").default
  ],
  computed: {
    typeClass() {
      return `is-${this.$attrs.type}`;
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    uId(choice) {
      return `${this.$attrs.name}--${choice.value}--${this.repeater || 0}`;
    }
  }
};
</script>


