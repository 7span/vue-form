export default {
  methods: {
    /**
     * Sets the defaults values based on config.
     */
    defaultValues(fields) {
      let defaultValues = {};

      for (var field in fields) {
        let fieldConfig = fields[field];
        if (fieldConfig.value) {
          defaultValues[field] = fieldConfig.value;
        } else {
          //If the repeater mode is on, the default value should be blank array
          if (fieldConfig.interface == "group" && fieldConfig.repeater) {
            let min = fieldConfig.repeater.min || 1;
            defaultValues[field] = [];
            //Generaes objects for minimum number of entries required in Repeater Object
            for (var i = 0; i < min; i++) {
              defaultValues[field][i] = {
                value: this.defaultValues(fieldConfig.fields)
              };
            }
          } else if (fieldConfig.interface == "group") {
            defaultValues[field] = this.defaultValues(fieldConfig.fields);
          } else if (fieldConfig.repeater) {
            defaultValues[field] = [];
          } else {
            defaultValues[field] = null;
          }
        }
      }

      return defaultValues;
    },

    isObject(variable) {
      return (
        typeof variable === "object" &&
        !Array.isArray(variable) &&
        variable !== null
      );
    }
  }
};
