export default {
  inject: ["SETTINGS"],
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
