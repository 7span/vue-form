<template>
  <div class="group" :class="{'field':name!='v-form'}">
    <!-- Group Label
    Hide if it is the top level group
    If index is provided, the repeater has already displayed the label.-->
    <label v-if="name!='v-form' && index==null" class="group__label">{{name | titleCase}}</label>

    <s-blocks>
      <s-block
        v-for="fieldConfig,fieldName in config.fields"
        v-show="!fieldConfig.hide"
        :size="fieldConfig.size || SETTINGS.defaults.size"
        :class="[blockClasses(fieldName,fieldConfig)]"
      >
        <!-- Before Slots -->
        <slot :name="`field--before--${fieldName}`" v-bind="slotScopes(fieldName)" />
        <slot
          v-if="index!=null"
          :name="`field--before--${fieldName}--${index}`"
          v-bind="slotScopes(fieldName)"
        />

        <!-- Field
        Need to keep the top level group's child interfaces as null to manage lable displays.-->
        <component
          :is="componentType(fieldConfig)"
          :key="fieldName"
          :name="fieldName"
          :config="fieldConfig"
          :index="index"
          :value="groupValue && groupValue[fieldName]"
          :parent-interface="name=='v-form'?null:'group'"
          :parent-value="groupValue"
          :parent-meta-value="groupMetaValue"
          @setGroupConfig="$emit('setRepeaterConfig',$event)"
          @input="input(arguments,fieldName)"
        >
          <!-- Passdown Slots 3 -->
          <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </component>

        <!-- After Slots -->
        <slot :name="`field--after--${fieldName}`" v-bind="slotScopes(fieldName)" />
        <slot
          v-if="index!=null"
          :name="`field--after--${fieldName}--${index}`"
          v-bind="slotScopes(fieldName)"
        />
      </s-block>
    </s-blocks>
  </div>
</template>

<script>
export default {
  name: "group",
  inject: ["SETTINGS"],

  mixins: [require("../mixins/fields").default],

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
      //Will contain local values of group
      groupValue: {},
      groupMetaValue: {}
    };
  },

  created() {
    this.setDefaultValues();
  },

  methods: {
    /**
     * Sets the default values of all the keys defined in the fields object.
     * Default values for diffrent type of fields: repeater = [], group = {}, normal = null
     */
    setDefaultValues() {
      for (var field in this.config.fields) {
        let val = this.defaultValue(this.config.fields[field]);
        this.$set(this.groupValue, field, val);
        //Always contain value inside value key in metaValues
        this.$set(this.groupMetaValue, field, {
          value: val
        });
      }

      //The changed object is always required to emit as 2nd argument.
      let changed = [
        {
          field: this.name,
          action: "group-default-value",
          value: this.groupValue,
          metaValue: this.groupMetaValue
        }
      ];
      this.$emit("input", this.groupValue, changed);
    },

    /**
     * On the input of child fields, merges the values in local values and emits the merged value.
     * @param {Array} args Contains 2 values. 1st is original value, 2nd is metaValue
     * @param {String,Object,Array} args[0] The field value
     * @param {Array} args[1] The array of changed fields and its values.
     */
    input(args, name) {
      let value = args[0];
      let changed = [...args[1]]; //Cloning an array to remove reference;

      // Merging the original value
      this.$set(this.groupValue, name, value);

      // Merging the meta value
      this.$set(
        this.groupMetaValue,
        name,
        changed[changed.length - 1].metaValue
      );

      changed.push({
        field: this.name,
        action: "group-input",
        value: this.groupValue,
        metaValue: this.groupMetaValue,
        index: this.index
      });

      this.$emit("input", this.groupValue, changed);
    },

    slotScopes(name) {
      return {
        value: this.value && this.value[name],
        metaValue: this.metaValue && this.metaValue[name],
        parentValue: this.value,
        parentMetaValue: this.metaValue,
        config: this.config.fields[name],
        index: this.index
      };
    },

    /**
     * Sets the grid size of ss-cols
     * If not defined, gets it from default configs
     */
    blockClasses(name, config) {
      let classes = [`block--${name}`];
      return classes;
    }
  }
};
</script>