<template lang="pug">
.blocks
  .block(
    v-for="fieldConfig,fieldName in data"
    v-show="isShown(fieldConfig)"
    :class="[colClass(fieldConfig)]")

    slot(:name="`field--before--${fieldName}`")

    interface(
      :name="fieldName"
      :config="fieldConfig"
      :value="values[fieldName]"
      :values="values"
      :valueObj="valuesObj[fieldName]"
      :valuesObj="valuesObj"
      @input="input(fieldName,arguments)")

      slot(
        v-for="slot,slotName in SLOTS" 
        :slot="slotName" 
        slot-scope="scope" 
        :name="slotName"
        :scope="scope")

    slot(:name="`field--after--${fieldName}`")
</template>

<script>
export default {
  name: "fields",
  inject: ["CONFIG", "SLOTS"],

  components: {
    Interface: require("@/plugin/components/interface.vue").default
  },

  props: {
    data: {
      type: Object
    },
    values: {
      type: [Object, Array]
    },
    valuesObj: {
      type: [Object, Array]
    }
  },

  methods: {
    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    colClass(field) {
      let col =
        (field.design && field.design.col) ||
        (this.CONFIG.defaults.design && this.CONFIG.defaults.design.col) ||
        12;
      return `is-${col}`;
    },

    isShown(config) {
      if (config.hide === undefined || config.hide === null) {
        return true;
      } else {
        return !config.hide;
      }
    },

    input(fieldName, args) {
      this.$emit("input", {
        field: fieldName,
        value: args[0],
        valueObj: args[1],
        repeaterIndex: args[2]
      });
    }
  }
};
</script>