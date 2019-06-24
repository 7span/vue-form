export default {
  inject: ["CONFIG"],
  props: {
    name: {
      default: null,
      type: String
    },
    type: {
      default: "text",
      type: String
    },
    placeholder: {
      default: null,
      type: [String, Number]
    },
    state: {
      default: null,
      type: String
    },
    value: {
      default: null,
      type: [String, Number, Array, File, FileList]
    },
    design: {
      default: () => {},
      type: Object
    },
    choices: {
      default: () => [],
      type: Array
    },
    repeater: {
      default: null,
      type: Number
    }
  }
};
