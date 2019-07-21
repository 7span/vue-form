<template lang="pug">
.interface(:class="`interface--${config.interface}`")
  .field(:class="fieldClasses")

    //LABEL
    label {{getLabel}} 

    .field__group(v-if="!config.repeater")
      .field__before(v-if="config.design && config.design.before") {{config.design.before}}
      component(
        :is="`v-${config.interface}`"
        v-bind="{name,value,valueObj,values,valuesObj,...config}"
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
              :value="repeaterValues[n - 1]"
              :valueObj="repeaterValuesObj[n - 1]"
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
  components: {
    VInput: require("@/plugin/components/interfaces/input.vue").default,
    VTextarea: require("@/plugin/components/interfaces/textarea.vue").default,
    VSelect: require("@/plugin/components/interfaces/select.vue").default,
    VChoice: require("@/plugin/components/interfaces/choice.vue").default,
    VFile: require("@/plugin/components/interfaces/file.vue").default,
    VGroup: require("@/plugin/components/interfaces/group.vue").default
  },
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
        /**
         * This adds an object with null values
         * to make sure that every fields added in DOM has respective key.
         */
        let defaultValues = null;
        if (this.config.fields) {
          defaultValues = this.defaultValues(this.config.fields);
        }
        this.$set(this.repeaterValues, this.repeaterCount, defaultValues);
        this.$set(this.repeaterValuesObj, this.repeaterCount, defaultValues);
        this.repeaterCount++;
        this.$emit("input", this.repeaterValues, this.repeaterValuesObj);
      }
    },

    removeRepeat(n) {
      this.repeaterCount--;
      this.repeaterValues.splice(n, 1);
      this.repeaterValuesObj.splice(n, 1);
      this.$emit("input", this.repeaterValues, this.repeaterValuesObj);
    },

    input(args, index) {
      if (index !== undefined) {
        this.$set(this.repeaterValues, index, args[0]);
        this.$set(this.repeaterValuesObj, index, args[1]);
        this.$emit("input", this.repeaterValues, this.repeaterValuesObj, index);
      } else {
        this.$emit("input", ...args);
      }
    },

    titleCase(str) {
      return str
        .replace(/([^A-Z])([A-Z])/g, "$1 $2") // split cameCase
        .replace(/[_\-]+/g, " ") // split snake_case and lisp-case
        .toLowerCase()
        .replace(/(^\w|\b\w)/g, function(m) {
          return m.toUpperCase();
        }) // title case words
        .replace(/\s+/g, " ") // collapse repeated whitespace
        .replace(/^\s+|\s+$/, ""); // remove leading/trailing whitespace
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
