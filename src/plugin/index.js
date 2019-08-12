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
  Vue.component(
    "Repeater",
    require("@/plugin/components/repeater.vue").default
  );
  Vue.component("Field", require("@/plugin/components/field.vue").default);
  Vue.component("Group", require("@/plugin/components/group.vue").default);
  Vue.component(
    "VInput",
    require("@/plugin/components/interfaces/input.vue").default
  );
  Vue.component(
    "VTextarea",
    require("@/plugin/components/interfaces/textarea.vue").default
  );
  Vue.component(
    "VSelect",
    require("@/plugin/components/interfaces/select.vue").default
  );
  Vue.component(
    "VChoice",
    require("@/plugin/components/interfaces/choice.vue").default
  );
  Vue.component(
    "VFile",
    require("@/plugin/components/interfaces/file.vue").default
  );

  //TitleCase Labels
  Vue.filter("titleCase", value => {
    return value
      .replace(/([^A-Z])([A-Z])/g, "$1 $2") // split cameCase
      .replace(/[_\-]+/g, " ") // split snake_case and lisp-case
      .toLowerCase()
      .replace(/(^\w|\b\w)/g, function(m) {
        return m.toUpperCase();
      }) // title case words
      .replace(/\s+/g, " ") // collapse repeated whitespace
      .replace(/^\s+|\s+$/, ""); // remove leading/trailing whitespace
  });
};

const plugin = {
  install,
  version
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
