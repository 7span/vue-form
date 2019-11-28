import helper from "./helper";

const install = (Vue, options) => {
  let appWithOptions = Vue.extend({
    extends: require("./components/Form").default,
    data() {
      return {
        ...options
      };
    }
  });

  Vue.component("VForm", appWithOptions);
  Vue.component("Repeater", require("./components/Repeater.vue").default);
  Vue.component("Field", require("./components/Field.vue").default);
  Vue.component("Group", require("./components/Group.vue").default);

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
