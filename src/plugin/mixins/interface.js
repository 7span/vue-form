export default {
  props: {
    name: {
      default: null,
      type: String
    },
    type: {
      default: "text",
      type: String
    },
    label: {
      default: null,
      type: [String, Number]
    },
    placeholder: {
      default: null,
      type: [String, Number]
    },
    messages: {
      default: null,
      type: Object
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
    rows: {
      default: 5,
      type: Number
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  computed: {
    getLabel() {
      return this.label || this.titleCase(this.name);
    },
    stateClass() {
      if (this.state === null) return null;
      if (this.state == "invalid") return "is-danger";
      if (this.state == "valid") return "is-success";
    },
    desc() {
      if (!this.messages) return null;
      if (this.state == "valid" && this.messages.valid) {
        return this.messages.valid;
      } else if (this.state == "invalid" && this.messages.invalid) {
        return this.messages.invalid;
      } else if (this.state === null && this.messages.desc) {
        return this.messages.desc;
      } else {
        return null;
      }
    }
  },
  methods: {
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
