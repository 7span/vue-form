export default {
  inject: ["CONFIG", "SLOTS"],
  props: {
    label: {},
    interface: {},
    state: {
      default: null,
      type: String
    },
    value: {
      default: null,
      type: [String, Number, Array, File, FileList, Object]
    },
    valueMeta: {
      default: null,
      type: [String, Number, Array, File, FileList, Object]
    },
    values: {
      default: null,
      type: [Object, Array]
    },

    valuesMeta: {
      default: null,
      type: [Object, Array]
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
      type: Number
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
