<template lang="pug">
.blocks
  .block(
    v-for="fieldConfig,fieldName in data"
    v-show="fieldConfig.hide? fieldConfig.hide(values) : true"
    :class="[colClass(fieldConfig)]")
    interface(
      :name="fieldName"
      :config="fieldConfig"
      :value="values[fieldName]"
      :values="values" 
      @input="$emit('input',{field:fieldName,value:$event})")
</template>

<script>
export default {
  name: "fields",
  inject: ["CONFIG"],

  components: {
    Interface: require("@/plugin/components/interface.vue").default
  },

  props: {
    data: {
      type: Object
    },
    values: {
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
    }
  }
};
</script>