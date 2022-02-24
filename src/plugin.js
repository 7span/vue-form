import defaultOptions from "./options";

//Components
import Root from "./components/Root";

const install = (Vue, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions);
  const prefix = options.componentPrefix;

  //Root Component
  Vue.component(`${prefix}Form`, {
    provide: {
      OPTIONS: options,
    },
    extends: Root,
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
