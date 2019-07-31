<template lang="pug">
.blocks
  .block(
    v-for="fieldConfig,fieldName in fields"
    v-show="isShown(fieldConfig)"
    :class="[colClass(fieldConfig)]")

    slot(:name="`field--before--${fieldName}`")
    
    interface(
      :key="fieldName"
      :name="fieldName"
      :fields="fields[fieldName]" 
      :config="fieldConfig"
      :value="value && value[fieldName]"
      :values="values"
      :valueObj="valueObj && valueObj[fieldName]"
      :valuesObj="valuesObj"
      @input="$emit('input',$event)")

      slot(
        v-for="slot,slotName in SLOTS" 
        :slot="slotName" 
        slot-scope="scope" 
        :name="slotName"
        :scope="scope")

    slot(
      :name="`field--after--${fieldName}`"
      :value="values[fieldName]"
      :values="values"
      :valueObj="valuesObj[fieldName]"
      :valuesObj="valuesObj")
      
</template>

<script>
export default {
  name: "fields",
  inject: ["CONFIG", "SLOTS"],

  components: {
    Interface: require("@/plugin/components/interface.vue").default
  },

  props: {
    fields: {
      type: Object
    },
    value: {
      type: [Object, Array]
    },
    valueObj: {
      type: [Object, Array]
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
    }
  }
};
</script>