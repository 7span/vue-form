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
  Vue.component("Field", require("@/plugin/components/field.vue").default);
  Vue.component(
    "FieldGroup",
    require("@/plugin/components/field-group.vue").default
  );
  Vue.component("Fields", require("@/plugin/components/fields.vue").default);
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
  // Vue.component(
  //   "VGroup",
  //   require("@/plugin/components/interfaces/group.vue").default
  // );
  Vue.component("VGroup", require("@/plugin/components/fields.vue").default);
};

const plugin = {
  install,
  version
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
