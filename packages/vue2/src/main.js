import defaultOptions from "./options";
import FormRoot from "./components/FormRoot.vue";

const install = (Vue, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions);
  const prefix = options.componentPrefix;

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
};

const plugin = {
  install,
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
