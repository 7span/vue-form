<template lang="pug">
.field(:class="fieldClasses")

  slot(:name="`field--start--${name}`")
  slot(v-if="index" :name="`field--start--${name}--${index}`")

  label(v-if="index==null") {{mergedConfig.label || titleCase(name)}}
  .field__group

    .field__before(v-if="mergedConfig.before") {{mergedConfig.before}}

    component(
      :index="index"
      :is="`v-${mergedConfig.interface}`"
      v-bind="{name,values,valuesObj,...mergedConfig}"
      :value="value"
      :valueObj="valueObj"
      @loading="$emit('loading',$event)"
      @input="input(arguments,{action:'input'})")

    //Passdown Slots
    template(v-for="slot in Object.keys($slots)" :slot="slot")
      slot(:name="slot")

    .field__after(v-if="mergedConfig.after") {{mergedConfig.after}}

  slot(:name="`field--end--${name}`")
  slot(v-if="index" :name="`field--end--${name}--${index}`")
</template>

<script>
export default {
  name: "field",
  mixins: [require("@/plugin/helper").default],
  props: {
    index: {
      default: null,
      type: Number
    },
    config: {
      type: Object
    },
    fields: {
      type: Object
    },
    name: {
      default: null
    },
    value: {
      default: null
    },
    valueObj: {
      default: null
    },
    values: {
      default: null
    },
    valuesObj: {
      default: null
    }
  },

  data() {
    return {
      localConfig: {}
    };
  },

  created() {
    //Changes the local config
    this.$root.$on("v-form::set-config", data => this.setConfig(data));
    this.$root.$on("v-form::set-value", data => this.setValue(data));
  },

  computed: {
    mergedConfig() {
      return {
        ...this.config,
        ...this.localConfig
      };
    }
  },

  methods: {
    fieldClasses() {
      let classes = [`field--${this.config.interface}`];
      if (this.state == "invalid") classes.push("is-danger");
      if (this.state == "valid") classes.push("is-success");
      if (this.loading) classes.push("is-loading");
      return classes;
    },

    input(args, { action }) {
      let toEmit;

      // When the field is group, the value is already formatted.
      // Just need to rearrange values to represent the parent field.
      if (this.config.interface == "group") {
        let data = args[0]; // The child field
        let value = {
          ...this.value,
          [data.field]: data.value
        };
        let valueObj = {
          ...this.valueObj,
          [data.field]: data.valueObj
        };
        toEmit = {
          field: this.name,
          value,
          valueObj,
          changed: [
            ...data.changed,
            {
              field: this.name,
              action: "child-input",
              value,
              valueObj,
              index: this.index
            }
          ]
        };
      } else {
        toEmit = {
          field: this.name,
          value: args[0],
          valueObj: args[1],
          changed: [
            {
              field: this.name,
              action: action,
              value: args[0],
              valueObj: args[1],
              index: this.index
            }
          ]
        };
      }
      this.$emit("input", toEmit);
    },

    setValue({ field, value, index }) {
      if (field == this.name && (index == null || index == this.index)) {
        this.input([value, { value }], { action: "set-value" });
      }
    },

    setConfig({ field, key, value, index }) {
      //Check If the field is same as provided
      //If index is not provided change the local config
      if (field == this.name && (index == null || index == this.index)) {
        this.$set(this.localConfig, key, value);
      }
    }
  }
};
</script>

