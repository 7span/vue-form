<template>
  <div class="field" :class="fieldClasses">
    <!-- Start Slots
    If the index is not provided the slots will render in all the repeater child fields
    To add specific index slot, append slot index.
    The syntex is: field--start--[field-name]--[index]-->
    <slot :name="`field--start--${name}`" v-bind="slotScopes" />
    <slot v-if="index!=null" :name="`field--start--${name}--${index}`" v-bind="slotScopes" />

    <!-- Label
    If the index is defined, the label should be displayed at repeater level.-->
    <label v-if="isLabel" class="field__label">{{(mergedConfig.label || name) | titleCase}}</label>

    <!-- Field Group -->
    <div class="field__group">
      <div v-if="mergedConfig.before" class="field__before">{{mergedConfig.before}}</div>

      <!-- Interface
      Extract all the configuration from this point to interface.
      This will help directly apply HTML attributes on interfaces if not accepted as props.-->
      <component
        :is="`s-${mergedConfig.interface}`"
        :name="name"
        v-bind="{...mergedConfig}"
        :value="value"
        :index="index"
        @loading="loading=$event"
        @input="input(arguments,{action:'input'})"
      >
        <!-- Passdown Slots -->
        <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </component>
      <div v-if="mergedConfig.after" class="field__after">{{mergedConfig.after}}</div>
    </div>

    <!-- End Slots -->
    <slot :name="`field--end--${name}`" v-bind="slotScopes" />
    <slot v-if="index!=null" :name="`field--end--${name}--${index}`" v-bind="slotScopes" />
  </div>
</template>

<script>
export default {
  name: "field",
  mixins: [require("../mixins/fields").default],
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
    this.$root.$on("v-form::set-config", data => this.setConfig(data));
    this.$root.$on("v-form::set-value", data => this.setValue(data));
  },

  computed: {
    slotScopes() {
      return {
        value: this.value,
        metaValue: this.metaValue,
        config: this.mergedConfig,
        parentValue: this.parentValue,
        parentMetaValue: this.parentMetaValue,
        index: this.index
      };
    },

    isLabel() {
      if (this.parentInterface == "repeater") {
        return false;
      } else if (
        this.parentInterface == "group" &&
        this.index != null &&
        this.index != 0
      ) {
        return false;
      }
      return true;
    }
  },

  methods: {
    fieldClasses() {
      let classes = [`field--${this.config.interface}`];
      if (this.state == "invalid") classes.push("field--danger");
      if (this.state == "valid") classes.push("field--success");
      if (this.loading) classes.push("field--loading");
      return classes;
    },

    /**
     * @param {Array} args
     * @param {String, Object, Array} args[0] The actual value of the field
     * @param {Object} args[1] The object contains the metadata of currently selected value.
     * @param {Object} info Extra information about the field
     * @param {String} info.action Describes how the event was triggered.
     */
    input(args, { action }) {
      let value = args[0];
      this.metaValue = args[1];
      // changed contains an array of events to notify how many fields were changed when any of the field updates.
      // It helps to track changes in repeater fields & group fields.
      var changed = [
        {
          field: this.name,
          action: action,
          value: value,
          metaValue: this.metaValue,
          index: this.index
        }
      ];
      this.$emit("input", value, changed);
    },

    /**
     * Updates the value of the field.
     * @param {Object} data
     * @param {String} data.field The field name to update value of.
     * @param {String,Number} data.value The value to set of field.
     * @param {Number} data.index If the field is child of repeater, index can be used to update that value only.
     */
    setValue({ field, value, index }) {
      if (field !== this.name) return;
      if (index == null || index == this.index) {
        this.input([value, { value }], { action: "set-value" });
      }
    },

    /**
     * Updates the configuration of a field.
     * If the index is provided and field is child of repeater, only that index will updated.
     * If not, will update all exisiting fields.
     * @param {Object} data
     * @param {String} data.field The field name to update config of.
     * @param {String} data.key Which key of a config object to update.
     * @param {String,Number} data.value Value to set of provided key
     * @param {Number} data.index If the field is child of repeater, index can be used to update that value only.
     */
    setConfig({ field, key, value, index }) {
      if (field !== this.name) return;
      if (index == null || index == this.index) {
        this.$set(this.localConfig, key, value);
      }
      //Make sure the upcoming repeater fields also inherit the updated configuration.
      if (index == null) {
        //For repeater, no need to send the field param as config is related to this field only.
        if (this.parentInterface == "repeater") {
          this.$emit("setRepeaterConfig", { key, value });
        }
        //For group, a field is required to pass to identify which field to update in a group
        if (this.parentInterface == "group") {
          this.$emit("setGroupConfig", { field, key, value });
        }
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


