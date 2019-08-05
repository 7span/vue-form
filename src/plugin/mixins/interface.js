export default {
  inject: ["CONFIG", "SLOTS"],
  props: {
    label: {},
    interface: {},
    fields: {},
    state: {
      default: null,
      type: String
    },
    value: {
      default: null,
      type: [String, Number, Array, File, FileList, Object]
    },
    values: {
      default: null,
      type: [Object, Array]
    },
    valuesObj: {
      default: null,
      type: [Object, Array]
    },
    valueObj: {
      default: null
    },
    design: {
      default: () => {},
      type: Object
    },
    choices: {
      default: () => [],
      type: [Object, Array]
    },
    repeater: {
      default: null,
      type: [Object, Number]
    }
  },

  data() {
    return {
      loading: false
    };
  },

  watch: {
    loading(nv) {
      this.$emit("loading", nv);
    }
  }
};
