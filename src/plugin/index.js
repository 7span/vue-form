import app from "./app";
const version = "__VERSION__";

const install = (Vue, options) => {
  let appWithOptions = Vue.extend({
    extends: app,
    data() {
      return {
        ...options
      };
    }
  });

  Vue.component("VForm", appWithOptions);
};

const plugin = {
  install,
  version
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
