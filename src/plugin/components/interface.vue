<template lang="pug">
.interface(:class="`interface--${config.interface}`")
  .field(:class="[stateClass]")

    //LABEL
    label {{getLabel}} 

    //INPUT
    component(
      v-if="!config.repeater"
      :is="`v-${config.interface}`"
      v-bind="{name,value,values,...config}"
      @input="input($event)")

    //INPUT REPEATER
    .repeater(v-else)
      .repeater__item(v-for="n in defaultRepeaterCount")
        .repeater__input
          component(
            :is="`v-${config.interface}`"
            v-bind="{name,values,...config}"
            :value="repeaterValues[n - 1]"
            :repeater="n - 1"
            @input="input($event,n - 1)")
        .repeater__remove(v-if="canRemoveRepeat")
          button.button.is-danger.is-muted(@click="removeRepeat(n - 1)") Remove
      

    //DESC
    small(v-if="desc") {{desc}}

    //REPEATER
    button.button.is-primary.is-muted.mt--sm(
      v-if="config.repeater && canRepeat"
      @click="repeat") Add More
</template>

<script>
export default {
  name: "interface",
  inject: ["CONFIG"],
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
    values: {
      default: null
    },
    config: {
      default: null
    }
  },
  data() {
    return {
      state: null,
      repeaterCount: null,
      repeaterValues: this.value
    };
  },
  computed: {
    defaultRepeaterCount() {
      if (!this.repeaterCount) {
        //If min is set, show minimum that items by default
        this.repeaterCount = this.config.repeater.min || 1;
      }
      return this.repeaterCount;
    },
    stateClass() {
      if (this.state === null) return null;
      if (this.state == "invalid") return "is-danger";
      if (this.state == "valid") return "is-success";
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
        this.repeaterCount++;
      }
    },

    removeRepeat(n) {
      this.repeaterCount--;
      this.repeaterValues.splice(n, 1);
      this.$emit("input", this.repeaterValues);
    },

    input(e, n) {
      if (n !== undefined) {
        this.$set(this.repeaterValues, n, e);
        this.$emit("input", this.repeaterValues);
      } else {
        this.$emit("input", e);
      }
    },

    buildAttributes() {},

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
  display: flex;
  flex-direction: column;
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
