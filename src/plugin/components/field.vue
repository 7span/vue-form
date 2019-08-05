<template lang="pug">
.field(:class="fieldClasses")

  //LABEL
  label {{getLabel}}

  //FIELD GROUP
  field-group(
    v-if="!config.repeater"
    v-bind="{name,values,valuesObj}"
    :config="mergedConfig"
    :value="value"
    :valueObj="valueObj"
    @loading="loading=$event"
    @input="input(arguments,{action:'input'})"
  )


  //INPUT REPEATER
  .repeater(v-else)
    .repeater__items
      .repeater__item(v-for="(item,i) in repeaterValues" v-show="!item._delete")
        .repeater__input

          field-group(
            :config="repeaterMergedConfig(i)"
            v-bind="{name,values,valuesObj}"
            :value="value && value[i] && value[i].value"
            :valueObj="valueObj && valueObj[i] && valueObj[i].value"
            :index="i"
            @loading="loading=$event"
            @input="input(arguments,{index:i,action:'input'})"
          )

          //-   slot(
          //-     v-for="slot,slotName in SLOTS" 
          //-     :slot="slotName" 
          //-     slot-scope="scope" 
          //-     :name="slotName"
          //-     :scope="scope")

        .repeater__remove(v-if="canRemoveRepeat")
          button.button.is-danger.is-trn.p--0.is-square(@click="removeRepeat(i)") 
            slot(name="repeater--remove")
              icon-remove.button__icon
    
    //DESC
    small(v-if="desc") {{desc}}

    //REPEATER
    .repeater__add
      button.button.is-primary.is-trn.p--0.mt--sm(
        v-if="config.repeater && canRepeat"
        @click="repeat") 
          slot(name="repeater--add")
            icon-add.button__icon
            span Add More
</template>

<script>
export default {
  name: "field",
  mixins: [require("@/plugin/helper").default],
  components: {
    IconRemove: require("@/plugin/components/icons/remove").default,
    IconAdd: require("@/plugin/components/icons/add").default
  },
  inject: ["CONFIG", "SLOTS"],
  props: {
    index: {
      type: Number,
      default: null
    },
    fields: {
      default: null
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
    },
    config: {
      default: null
    }
  },
  data() {
    return {
      localConfig: { ...this.config },
      repeaterLocalConfig: [],
      state: null,
      loading: false
    };
  },

  created() {
    //Changes the local config
    this.$root.$on("v-form::set-config", data => this.setConfig(data));
    this.$root.$on("v-form::set-value", data => this.setValue(data));
  },

  computed: {
    //Clones the values.
    //If the repeater is on, then only clone the values and create an array
    repeaterValues() {
      return this.config.repeater ? [...this.value] : [];
    },
    repeaterValuesObj() {
      return this.config.repeater ? [...this.valueObj] : [];
    },
    repeaterCount() {
      return this.repeaterValues.filter(item => !item._delete).length;
    },

    mergedConfig() {
      return {
        ...this.config,
        ...this.localConfig
      };
    },

    fieldClasses() {
      let classes = [`field--${this.config.interface}`];
      if (this.state == "invalid") classes.push("is-danger");
      if (this.state == "valid") classes.push("is-success");
      if (this.loading) classes.push("is-loading");
      return classes;
    },

    getLabel() {
      return this.config.label || this.titleCase(this.name);
    },

    desc() {
      let messages = this.config.messages;
      if (!messages) return null;
      if (this.state == "valid" && messages.valid) {
        return messages.valid;
      } else if (this.state == "invalid" && messages.invalid) {
        return messages.invalid;
      } else if (this.state === null && messages.desc) {
        return messages.desc;
      } else {
        return null;
      }
    },

    canRepeat() {
      if (this.config.repeater.max) {
        if (this.repeaterCount < this.config.repeater.max) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },

    canRemoveRepeat() {
      if (this.config.repeater.min) {
        if (this.repeaterCount > this.config.repeater.min) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  },

  methods: {
    //Ignores $delete:true items
    indexWithoutDeleted(index) {
      let newIndex = index + 0;
      for (var i = 0; i < index; i++) {
        if (this.repeaterValues[i] && this.repeaterValues[i]._delete === true) {
          newIndex--;
        }
      }
      return newIndex;
    },

    //If the config is set in repeaterLocalConfig, use it. Else the mergedConfig
    repeaterMergedConfig(index) {
      return this.repeaterLocalConfig[index] || this.mergedConfig;
    },

    repeat() {
      if (this.canRepeat) {
        // This adds an object with null values
        // To make sure that every fields added in DOM has respective key.
        let defaultValues = null;
        if (this.config.fields) {
          defaultValues = this.defaultValues(this.config.fields);
        }

        let index = this.repeaterValues.length;
        this.$set(this.repeaterValues, index, {
          value: defaultValues
        });
        this.$set(this.repeaterValuesObj, index, {
          value: defaultValues
        });

        this.emitValue({
          value: this.repeaterValues,
          valueObj: this.repeaterValuesObj,
          index: index,
          action: "repeat-add"
        });
      }
    },

    removeRepeat(index) {
      //If the `id` is existing in repeater item, it is saved on server
      //We need to keep it and set $delete:true to let api know to remove item.
      if (this.repeaterValues[index]._id) {
        this.$set(this.repeaterValues, index, {
          ...this.repeaterValues[index],
          _delete: true
        });
        this.$set(this.repeaterValuesObj, index, {
          ...this.repeaterValuesObj[index],
          _delete: true
        });
      } else {
        this.repeaterValues.splice(index, 1);
        this.repeaterValuesObj.splice(index, 1);
      }
      //Remove the local configuration of repeater field at provided index
      this.repeaterLocalConfig.splice(index, 1);

      this.emitValue({
        value: this.repeaterValues,
        valueObj: this.repeaterValuesObj,
        index: index,
        action: "repeat-remove"
      });
    },

    input(args, { index, action }) {
      let value, valueObj;

      // If repeater is provded and group interface
      // Need to set merged object at provided index.
      // Please note that repeater fields' value is inside "value" key.
      if (this.config.interface == "group" && index !== undefined) {
        let fieldName = args[0].field;
        this.$set(this.repeaterValues, index, {
          value: {
            ...this.repeaterValues[index].value,
            [fieldName]: args[0].value
          }
        });
        this.$set(this.repeaterValuesObj, index, {
          value: {
            ...this.repeaterValuesObj[index].value,
            [fieldName]: args[0].valueObj
          }
        });

        value = this.repeaterValues;
        valueObj = this.repeaterValuesObj;
      }
      //If group interface, the received args is a prepared object.
      // Merge values with already existing values
      else if (this.config.interface == "group") {
        let fieldName = args[0].field;
        value = {
          ...this.value,
          [fieldName]: args[0].value
        };
        valueObj = {
          ...this.valueObj,
          [fieldName]: args[0].valueObj
        };
      }
      // If only Index is provided, the normal repeater field
      else if (index !== undefined) {
        this.$set(this.repeaterValues, index, {
          value: args[0]
        });
        this.$set(this.repeaterValuesObj, index, {
          value: args[1]
        });
        value = this.repeaterValues;
        valueObj = this.repeaterValuesObj;
      }
      // Normal Field
      else {
        value = args[0];
        valueObj = args[1];
      }
      this.emitValue({
        value,
        index,
        valueObj,
        action,
        changed: args[0].changed
      });
    },

    emitValue({ value, valueObj, index, action, changed = [] }) {
      changed.push({
        field: this.name,
        action
      });
      this.$emit("input", {
        field: this.name,
        index: this.indexWithoutDeleted(index),
        value,
        valueObj,
        action,
        changed
      });
    },

    setValue({ field, value, index }) {
      if (field != this.name) return;
      if (index == null || index == this.index) {
        this.input([value, { value }], { action: "set-value" });
      }
      if (index != null && this.index == null) {
        this.input([value, { value }], { index, action: "set-value" });
      }
    },

    setConfig({ field, key, value, index }) {
      //Check If the field is same as provided
      if (field != this.name) return;

      //If index is not provided change the local config
      //If index is provided, merge the value with local config and put it in the array at provided  index
      //The config will be passed from array then.
      if (index == null || index == this.index) {
        this.$set(this.localConfig, key, value);
      }
      // This is a special case where top level fields do not have repeater index as props
      // Hence need to keep an array of separate configuration array.
      if (index != null && this.index == null) {
        this.$set(this.repeaterLocalConfig, index, {
          ...this.mergedConfig,
          [key]: value
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.repeater {
  &__items {
    flex-direction: column;
    display: flex;
  }
  &__item {
    display: flex;
    + .repeater__item {
      margin-top: 10px;
    }
  }
  &__input {
    flex: 1 1 auto;
  }
  &__remove {
    flex: 0 0 auto;
    margin-left: 10px;
    align-self: flex-end;
  }
}
</style>
