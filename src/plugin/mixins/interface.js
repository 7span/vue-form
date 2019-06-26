export default {
  inject: ["CONFIG"],
  props: {
    config: {
      default: () => ({}),
      type: Object
    },
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
      type: [String, Number, Array, File, FileList, Object]
    },
    values: {
      default: null,
      type: Object
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
