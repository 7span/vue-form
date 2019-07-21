<template lang="pug">
.field__group
  fields(
    :data="fields" 
    :values="groupValue" 
    :valuesObj="groupValueObj"
    @input="updateValue($event)")

    slot(
      v-for="slot,slotName in SLOTS" 
      :slot="slotName" 
      slot-scope="scope" 
      :name="slotName"
      :scope="scope")
</template>

<script>
export default {
  name: "interface-group",
  mixins: [require("@/plugin/mixins/interface").default],
  props: {
    fields: {
      default: () => ({}),
      type: Object
    }
  },

  computed: {
    name() {
      return this.$attrs.name;
    },

    fieldValue() {
      return (this.values && this.values[this.name]) || {};
    },

    repeaterFieldValue() {
      return (this.fieldValue && this.fieldValue[this.repeater]) || {};
    },

    groupValue() {
      if (this.repeater === null) {
        return this.values[this.name] || {};
      } else {
        return this.values[this.name][this.repeater] || {};
      }
    },

    groupValueObj() {
      if (this.repeater === null) {
        return this.valuesObj[this.name] || {};
      } else {
        return this.valuesObj[this.name][this.repeater] || {};
      }
    }
  },
  methods: {
    /**
     * When group of fields is uses, we need to merge already existing values of other fields and
     * updated field to maintain same values across the form.
     */
    updateValue(event) {
      let value = {
        ...this.groupValue,
        [event.field]: event.value
      };

      let valueObj = {
        ...this.groupValueObj,
        [event.field]: event.valueObj
      };

      this.$emit("input", value, valueObj, event.repeaterIndex);
    }
  }
};
</script>

<style lang="scss">
.field__group {
  .blocks {
    flex: 1 1 auto;
  }
}
</style>

