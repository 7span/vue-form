<template lang="pug">
.blocks
  .block(
    v-for="fieldConfig,fieldName in fields"
    v-show="isShown(fieldConfig)"
    :class="[colClass(fieldConfig,fieldName)]")
    
    //Before Slots
    slot(:name="`field--before--${fieldName}`" v-bind="slotScopes(fieldName)")
    slot(v-if="index!=null" :name="`field--before--${fieldName}--${index}`" v-bind="slotScopes(fieldName)")

    //Field
    component(
      :is="whichComponent(fieldConfig)"
      :index="index"
      :key="fieldName"
      :name="fieldName"
      :fields="fields.fields" 
      :config="fieldConfig"
      :value="value && value[fieldName]"
      :value-obj="valueObj && valueObj[fieldName]"
      @input="input($event,fieldName)")

      //Passdown Slots
      template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
        slot(:name="slot" v-bind="scope")

    //After Slots
    slot(:name="`field--after--${fieldName}`" v-bind="slotScopes(fieldName)")
    slot(v-if="index!=null" :name="`field--after--${fieldName}--${index}`" v-bind="slotScopes(fieldName)")
      
</template>

<script>
export default {
  name: "fields",
  inject: ["CONFIG"],
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
  data() {
    return {
      groupValues: { ...this.value },
      groupValuesObj: { ...this.valueObj }
    };
  },

  methods: {
    input(e, name) {
      console.log("FROM FIELD", name, e);
      console.log("GROUP BEFORE", this.groupValues);
      this.$set(this.groupValues, e.field, e.value);
      this.$set(this.groupValuesObj, e.field, e.valueObj);
      console.log("GROUP AFTER", this.groupValues);

      let toEmit = {
        field: this.$attrs.name,
        value: this.groupValues,
        valueObj: this.groupValuesObj,
        changed: [
          ...e.changed,
          {
            field: name,
            action: "child-input",
            value: this.groupValues,
            valueObj: this.groupValuesObj,
            index: this.index
          }
        ]
      };
      this.$emit("input", toEmit);
    },

    slotScopes(name) {
      return {
        value: this.value && this.value[name],
        valueObj: this.valueObj && this.valueObj[name],
        config: this.fields[name],
        index: this.index
      };
    },

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