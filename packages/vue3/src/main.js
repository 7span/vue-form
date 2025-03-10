import defaultOptions from "./options";
import FormRoot from "./components/FormRoot.vue";

const install = (app, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions);
  const prefix = options.componentPrefix;

  app.provide("OPTIONS", options);

  app.component(`${prefix}Form`, {
    setup() {
      return { OPTIONS: options };
    },
    extends: FormRoot,
  });
};

const plugin = {
  install,
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
