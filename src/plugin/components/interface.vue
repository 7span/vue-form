<template lang="pug">
.interface(:class="`interface--${config.interface}`")
  .field(:class="fieldClasses")

    //LABEL
    label {{getLabel}} 
    .field__group(v-if="!config.repeater")
      .field__before(v-if="config.design && config.design.before") {{config.design.before}}
      component(
        :is="`v-${config.interface}`"
        v-bind="{name,values,valuesObj,...config}"
        :value="value"
        :valueObj="valueObj"
        @loading="loading=$event"
        @input="input(arguments)")

        slot(
          v-for="slot,slotName in SLOTS" 
          :slot="slotName" 
          slot-scope="scope" 
          :name="slotName"
          :scope="scope")

      .field__after(v-if="config.design && config.design.after") {{config.design.after}}

    //INPUT REPEATER
    .repeater(v-else)
      .repeater__items
        .repeater__item(v-for="n in defaultRepeaterCount")
          .repeater__input
            component(
              :is="`v-${config.interface}`"
              v-bind="{name,values,valuesObj,...config}"
              :value="value && value[n - 1].value"
              :valueObj="valueObj && valueObj[n - 1].value"
              :repeater="n - 1"
              @loading="loading=$event"
              @input="input(arguments,n - 1)")

              slot(
                v-for="slot,slotName in SLOTS" 
                :slot="slotName" 
                slot-scope="scope" 
                :name="slotName"
                :scope="scope")

          .repeater__remove(v-if="canRemoveRepeat")
            button.button.is-danger.is-muted(@click="removeRepeat(n - 1)") 
              slot(name="repeater--remove") Remove
      
      //DESC
      small(v-if="desc") {{desc}}

      //REPEATER
      .repeater__add
        button.button.is-primary.is-muted.mt--sm(
          v-if="config.repeater && canRepeat"
          @click="repeat") 
            slot(name="repeater--add") Add More
</template>

<script>
export default {
  name: "interface",
  mixins: [require("@/plugin/helper").default],
  inject: ["CONFIG", "SLOTS"],
  props: {
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
      state: null,
      repeaterCount: null,
      //Clones the values.
      //If the repeater is on, then only clone the values and create an array
      repeaterValues: this.config.repeater ? [...this.value] : null,
      repeaterValuesObj: this.config.repeater ? [...this.valueObj] : null,
      loading: false
    };
  },
  computed: {
    mergedConfig() {
      return {
        ...this.config,
        ...this.localConfig
      };
    },
    defaultRepeaterCount() {
      if (!this.repeaterCount) {
        //If min is set, show minimum that items by default
        this.repeaterCount = this.config.repeater.min || 1;
      }
      return this.repeaterCount;
    },

    fieldClasses() {
      let classes = [];
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
    repeat() {
      if (this.canRepeat) {
        // This adds an object with null values
        // To make sure that every fields added in DOM has respective key.
        let defaultValues = null;
        if (this.config.fields) {
          defaultValues = this.defaultValues(this.config.fields);
        }
        this.$set(this.repeaterValues, this.repeaterCount, {
          value: defaultValues
        });
        this.$set(this.repeaterValuesObj, this.repeaterCount, {
          value: defaultValues
        });

        this.emitValue({
          value: this.repeaterValues,
          valueObj: this.repeaterValuesObj,
          index: this.repeaterCount
        });
        this.repeaterCount++;
      }
    },

    removeRepeat(index) {
      this.repeaterCount--;
      this.repeaterValues.splice(index, 1);
      this.repeaterValuesObj.splice(index, 1);

      this.emitValue({
        value: this.repeaterValues,
        valueObj: this.repeaterValuesObj,
        index: index
      });
    },

    input(args, index) {
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

      this.emitValue({ value, index, valueObj });
    },

    emitValue({ value, valueObj, index }) {
      this.$emit("input", {
        field: this.name,
        value,
        index,
        valueObj
      });
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
