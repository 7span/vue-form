<template lang="pug">
.field(:class="[stateClass]")
  label {{getLabel}}
  .ss-grid(:class="`is-${design.grid}`") 
    .field(
      :class="[typeClass]" 
      v-for="choice in choices")
      input(
        v-bind="{name,type}" 
        :value="choice.value" 
        v-model="val"
        @change="updateValue($event)"
        :id="uId(choice)")
      label(:for="uId(choice)") {{choice.label}}
      small(v-if="desc") {{desc}}
</template>

<script>
export default {
  mixins: [require("@/plugin/mixins/interface").default],
  computed: {
    typeClass() {
      return `is-${this.type}`;
    }
  },
  methods: {
    uId(choice) {
      return `${this.name}--${choice.value}`;
    },
    updateValue(event) {
      this.$emit("input", this.val);
    }
  }
};
</script>


