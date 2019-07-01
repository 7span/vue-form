<template lang="pug">
.field__input
  .grid(:class="`is-${design.grid}`") 
    .field(
      :class="[typeClass]" 
      v-for="choice in choices")
      input(
        :value="choice.value" 
        v-model="val"
        v-bind="{name,type,disabled,readonly}"
        @change="updateValue($event)"
        :id="uId(choice)")
      label(:for="uId(choice)") {{choice.label}}
</template>

<script>
export default {
  name: "interface-choice",
  mixins: [require("@/plugin/mixins/interface").default],
  computed: {
    typeClass() {
      return `is-${this.type}`;
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    uId(choice) {
      return `${this.name}--${choice.value}--${this.repeater || 0}`;
    },
    updateValue(event) {
      this.$emit("input", this.val);
    }
  }
};
</script>


