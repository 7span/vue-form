/**
 * Always define a required configuration object.
 * This avoids errors like 'can not read of undefined'
 */

const CHOICES_CONFIG = {
  labelKey: "label",
  valueKey: "value"
};

const REQUEST_CONFIG = {
  url: null,
  params: {},
  adapter(res) {
    return res;
  }
};

export default {
  data() {
    return {
      preparedChoices: []
    };
  },

  inject: ["ADAPTERS", "CONFIG"],

  computed: {
    /**
     * Merges the config object from props with default config.
     */
    choicesConfig() {
      let config = {
        ...CHOICES_CONFIG,
        ...this.choices
      };

      //If choice is not array, the request object shold be prepared to send request
      if (!Array.isArray(this.choices)) {
        let request = {
          ...REQUEST_CONFIG,
          ...this.choices.request
        };
        config = { ...config, request };
        //Checks if the request object is defined and URL is not set.
        if (!config.request.url) {
          console.error(
            "The choices does not have a URL in request object for:",
            this.name
          );
        }
      }

      return config;
    }
  },

  created() {
    // If choices is an array, use the options as it is.
    // If it's an object, process it and then return array.
    if (Array.isArray(this.choices)) {
      this.preparedChoices = this.choices;
    } else {
      this.getChoices();
    }
  },

  methods: {
    /**
     * Builds a list of options for select,radio,checkbox
     * based on request object provided.
     */
    getChoices() {
      let _request = this.choicesConfig.request;
      this.loading = true;
      this.CONFIG.axios
        .get(_request.url, {
          params: {
            ..._request.params
          }
        })
        .then(res => {
          //TODO: Add Global Adaptor

          //1. Inline Adaptor in Request Config
          let data = _request.adapter(res);

          //2. Specified in Adapter Prop in Form Config
          if (
            this.ADAPTERS &&
            this.ADAPTERS[this.name] &&
            this.ADAPTERS[this.name].choices
          ) {
            data = this.ADAPTERS[this.name].choices(data);
          }

          if (Array.isArray(data)) {
            this.preparedChoices = data;
          } else {
            console.error(
              "The response of the request in choices should be an array. Please use request.adapter to modify the response:",
              this.name
            );
          }
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    }
  }
};
