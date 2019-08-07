<template lang="pug">
.field(:class="fieldClasses")
  //Start Slots
  slot(:name="`field--start--${name}`" v-bind="slotScopes")
  slot(v-if="index!=null" :name="`field--start--${name}--${index}`" v-bind="slotScopes")

  label(v-if="index==null || index===0") {{mergedConfig.label || titleCase(name)}}

  //Field Group
  .field__group
    .field__before(v-if="mergedConfig.before") {{mergedConfig.before}}

    //Interface
    component(
      :index="index"
      :is="`v-${mergedConfig.interface}`"
      v-bind="{...mergedConfig}"
      :name="name"
      :value="value"
      :value-obj="valueObj"
      @loading="$emit('loading',$event)"
      @input="input(arguments,{action:'input'})")

      //Passdown Slots
      template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
        slot(:name="slot" v-bind="scope")

    .field__after(v-if="mergedConfig.after") {{mergedConfig.after}}

  //End Slots
  slot(:name="`field--end--${name}`" v-bind="slotScopes")
  slot(v-if="index!=null" :name="`field--end--${name}--${index}`" v-bind="slotScopes")
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
    },

    slotScopes() {
      return {
        value: this.value,
        valueObj: this.valueObj,
        config: this.mergedConfig,
        index: this.index
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
      var toEmit;
      // When the field is group, the value is already formatted.
      // Just need to rearrange values to represent the parent field.
      if (!args[1]) {
        toEmit = args[0];
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

