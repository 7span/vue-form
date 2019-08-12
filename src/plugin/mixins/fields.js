export default {
  props: {
    name: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      localConfig: {}
    };
  },

  computed: {
    mergedConfig() {
      let config = {
        ...this.config,
        ...this.localConfig
      };
      //Remove repeater configuration for child element.
      delete config.repeater;
      //Remove Default Values
      delete config.value;

      return config;
    }
  },

  methods: {
    defaultValue(config) {
      if (config.value) {
        return config.value;
      } else if (config.repeater) {
        return [];
      } else if (config.fields) {
        return {};
      } else {
        return null;
      }
    },

    componentType(config) {
      //Repeater has priority over field grouping
      if (config.repeater) {
        return "repeater";
      } else if (config.fields) {
        return "group";
      } else {
        return "field";
      }
    }
  }
};
