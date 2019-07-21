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
        @change="updateValue($event)"
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
    },

    /**
     * Emit the actual value as well as choice object
     * This helps to make decesion based on other values of choices
     */
    updateValue(event) {
      let value = this.val;
      let choice;

      //Find the Object with all the values
      // This creates an array of objects with the all the values selected in checkbox
      if (this.$attrs.type == "checkbox") {
        choice = this.preparedChoices.filter(item =>
          value.includes(item[this.choicesConfig.valueKey])
        );
      }
      //If a radio, only single value at a time
      if (this.$attrs.type == "radio") {
        choice = this.preparedChoices.find(
          item => value == item[this.choicesConfig.valueKey]
        );
      }

      this.$emit("input", value, choice);
    }
  }
};
</script>


