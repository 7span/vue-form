<template lang="pug">
.group
  label.group__label(v-if="name!='v-form'") {{name | titleCase}}
  .blocks
    .block(
      v-for="fieldConfig,fieldName in config.fields"
      v-show="isShown(fieldConfig)"
      :class="[colClass(fieldName,fieldConfig)]")
      
      //Before Slots
      slot(:name="`field--before--${fieldName}`" v-bind="slotScopes(fieldName)")
      slot(v-if="index!=null" :name="`field--before--${fieldName}--${index}`" v-bind="slotScopes(fieldName)")

      //Field
      component(
        :is="componentType(fieldConfig)"
        :key="fieldName" 
        :name="fieldName"
        :config="fieldConfig"
        :value="groupValue && groupValue[fieldName]"
        @input="input(arguments,fieldName)")

        //Passdown Slots
        template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
          slot(:name="slot" v-bind="scope")

      //After Slots
      slot(:name="`field--after--${fieldName}`" v-bind="slotScopes(fieldName)")
      slot(v-if="index!=null" :name="`field--after--${fieldName}--${index}`" v-bind="slotScopes(fieldName)")
      
</template>

<script>
export default {
  name: "group",
  inject: ["SETTINGS"],

  mixins: [
    require("@/plugin/helper").default,
    require("@/plugin/mixins/fields").default
  ],

  props: {
    value: {
      default: null,
      type: Object
    },
    index: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      // Need to clone values to avoid directly mutating props.
      groupValue: {},
      groupMetaValue: {}
    };
  },

  created() {
    this.setDefaultValues();
  },

  methods: {
    setDefaultValues() {
      for (var field in this.config.fields) {
        let val = this.defaultValue(this.config.fields[field]);
        this.$set(this.groupValue, field, val);
        this.$set(this.groupMetaValue, field, {
          value: val
        });
      }
      this.$emit("input", this.groupValue, [
        {
          field: this.name,
          action: "group-default-value",
          value: this.groupValue,
          metaValue: this.groupMetaValue
        }
      ]);
    },

    input(args, name) {
      console.log("==>>", JSON.stringify(args[0]));
      this.$set(this.groupValue, name, args[0]);
      var changeMerged;
      this.groupMetaValue = {
        ...this.groupMetaValue,
        //Last element of changes array contains all the metaValues
        [name]: args[1][args[1].length - 1].metaValue
      };
      let changed = {
        field: this.name,
        action: "group-input",
        value: this.groupValue,
        metaValue: this.groupMetaValue,
        index: this.index
      };
      changeMerged = [...args[1], changed];

      this.$emit("input", this.groupValue, changeMerged);
    },

    slotScopes(name) {
      return {
        value: this.value && this.value[name],
        metaValue: this.metaValue && this.metaValue[name],
        config: this.config.fields[name],
        index: this.index
      };
    },

    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    colClass(name, config) {
      let classes = [`block--${name}`];
      let col =
        (config.design && config.design.col) ||
        (this.SETTINGS.defaults.design && this.SETTINGS.defaults.design.col) ||
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
    }
  }
};
</script>