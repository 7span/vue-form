<template lang="pug">
.v-form
  .ss-row
    .ss-col(
      v-for="field,name in fields"
      v-show="field.hide? field.hide(values) : true"
      :class="[colClass(field)]")
      component(
        :is="`v-${field.interface}`"
        :name="name"
        :value="values[name]"
        v-bind="buildAttr(name,field)"
        @input="updateValue(name,$event)")
</template>

<script>
export default {
  components: {
    VInput: require("@/plugin/components/interfaces/input.vue").default,
    VTextarea: require("@/plugin/components/interfaces/textarea.vue").default,
    VSelect: require("@/plugin/components/interfaces/select.vue").default,
    VChoice: require("@/plugin/components/interfaces/choice.vue").default,
    VFile: require("@/plugin/components/interfaces/file.vue").default
  },

  props: {
    config: {
      type: Object
    },
    fields: {
      type: Object
    }
  },

  data() {
    return {
      values: {}, //Contains all the values of form.
      interfaceConfig: {
        input: require("@/plugin/components/interfaces/input.json"),
        choice: require("@/plugin/components/interfaces/choice.json"),
        textarea: require("@/plugin/components/interfaces/textarea.json"),
        select: require("@/plugin/components/interfaces/select.json"),
        file: require("@/plugin/components/interfaces/file.json")
      }
    };
  },

  created() {
    this.setValues();
  },

  computed: {},

  methods: {
    buildAttr(name, field) {
      //Get allowed interfaces from the Interface Config.
      let attrs = this.interfaceConfig[field.interface].attrs;
      //Loop through config and set values.
      let attrsToBind = {};
      attrs.forEach(attr => {
        attrsToBind[attr] = field[attr] || this.config.defaults[attr];
      });
      return attrsToBind;
    },

    /**
     * Updates the value based on key and
     * emits all the values
     */
    updateValue(field, value) {
      if (this.values[field]) {
        this.values[field] = value;
      } else {
        this.$set(this.values, field, value);
      }
      this.$emit("input", this.values);
    },

    /**
     * Sets the defaults values based on config.
     */
    setValues() {
      let values = this.fields;
      for (var field in values) {
        this.$set(this.values, field, this.fields[field].value || null);
      }
      this.$emit("input", this.values);
    },

    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    colClass(field) {
      let col =
        (field.design && field.design.col) ||
        (this.config.defaults.design && this.config.defaults.design.col) ||
        12;
      return `is-${col}`;
    }
  }
};
</script>

<style lang="scss">
</style>


