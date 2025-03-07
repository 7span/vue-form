import defaultOptions from "./options";

//Components
import FormRoot from "./components/FormRoot";

const install = (Vue, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions);
  const prefix = options.componentPrefix;

  //Root Component
  Vue.component(`${prefix}Form`, {
    data() {
      return {
        OPTIONS: options,
      };
    },
    provide: {
      OPTIONS: options,
    },
    extends: FormRoot,
  });

  // Vue.component(`${prefix}Form`, Root);
};

const plugin = {
  install,
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
