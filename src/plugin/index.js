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
  //This is recursive component, hence defined globally.
  Vue.component("Fields", require("@/plugin/components/fields.vue").default);
};

const plugin = {
  install,
  version
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
