<template lang="pug">
.field(:class="fieldClasses")

  //Start Slots
  slot(:name="`field--start--${name}`" v-bind="slotScopes")
  slot(v-if="index!=null" :name="`field--start--${name}--${index}`" v-bind="slotScopes")

  label.field__label {{(mergedConfig.label || name) | titleCase}}

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
      @loading="loading=$event"
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
  mixins: [
    require("@/plugin/helper").default,
    require("@/plugin/mixins/fields").default
  ],
  props: {
    value: {
      default: null
    },
    index: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      loading: false,
      metaValue: null
    };
  },

  created() {
    //Changes the local config
    this.$root.$on("v-form::set-config", data => this.setConfig(data));
    this.$root.$on("v-form::set-value", data => this.setValue(data));
  },

  computed: {
    slotScopes() {
      return {
        value: this.value,
        metaValue: this.metaValue,
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
      var changed = [
        {
          field: this.name,
          action: action,
          value: args[0],
          metaValue: args[1],
          index: this.index
        }
      ];
      this.$emit("input", args[0], changed);
    },

    setValue({ field, value, index }) {
      if (field == this.name && (index == null || index == this.index)) {
        this.input([value, { value }], { action: "set-value" });
      }
    },

    setConfig({ field, key, value, index }) {
      if (field !== this.name) return;
      //Check If the field is same as provided
      //If index is not provided change the local config
      if (index == null || index == this.index) {
        this.$set(this.localConfig, key, value);
      }
    }
  }
};
</script>

<style lang="scss">
.field__group {
  > .blocks {
    flex: 1 1 auto;
  }
}
</style>


