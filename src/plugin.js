import helper from "./helper";
import ShilpVue from "@7span/shilp-vue/src/plugin.js";
import axios from "axios";

const install = (Vue, options) => {
  let appWithOptions = Vue.extend({
    extends: require("./components/Form").default,
    data() {
      return {
        ...options
      };
    }
  });

  Vue.use(ShilpVue, {
    axios: axios
  });

  Vue.component("VForm", appWithOptions);
  Vue.component("Repeater", require("./components/Repeater.vue").default);
  Vue.component("Field", require("./components/Field.vue").default);
  Vue.component("Group", require("./components/Group.vue").default);

  // Vue.component("VInput", require("./components/interfaces/input.vue").default);
  // Vue.component(
  //   "VTextarea",
  //   require("./components/interfaces/textarea.vue").default
  // );
  // Vue.component(
  //   "VSelect",
  //   require("./components/interfaces/select.vue").default
  // );
  // Vue.component(
  //   "VChoice",
  //   require("./components/interfaces/choice.vue").default
  // );
  // Vue.component("VFile", require("./components/interfaces/file.vue").default);

  //TitleCase Labels
  Vue.filter("titleCase", value => helper.titleCase(value));
};

const plugin = {
  install,
  version: "__VERSION__"
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
