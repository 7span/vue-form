<template lang="pug">
.blocks
  .block(
    v-for="fieldConfig,fieldName in fields"
    v-show="isShown(fieldConfig)"
    :class="[colClass(fieldConfig,fieldName)]")

    slot(:name="`field--before--${fieldName}`")
    
    component(
      :is="whichComponent(fieldConfig)"
      :index="index"
      :key="fieldName"
      :name="fieldName"
      :fields="fields[fieldName]" 
      :config="fieldConfig"
      :value="value && value[fieldName]"
      :values="values"
      :valueObj="valueObj && valueObj[fieldName]"
      :valuesObj="valuesObj"
      @input="$emit('input',$event)")

      //- slot(
      //-   v-for="slot,slotName in SLOTS" 
      //-   :slot="slotName" 
      //-   slot-scope="scope" 
      //-   :name="slotName"
      //-   :scope="scope")

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
  mixins: [
    //Because this also behaves as interface when grouped.
    require("@/plugin/mixins/interface").default
  ],
  props: {
    index: {
      default: null,
      type: Number
    }
  },
  methods: {
    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    colClass(field, name) {
      let classes = [`block--${name}`];
      let col =
        (field.design && field.design.col) ||
        (this.CONFIG.defaults.design && this.CONFIG.defaults.design.col) ||
        12;
      classes.push(`is-${col}`);
      return classes;
    },

    isShown(config) {
      if (config.hide === undefined || config.hide === null) {
        return true;
      } else {
        return !config.hide;
      }
    },

    whichComponent(config) {
      if (config.repeater) {
        return "repeater";
      } else {
        return "field";
      }
    }
  }
};
</script>