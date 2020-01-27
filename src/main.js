import Vue from "vue";
import App from "./App.vue";
import ShilpVue from "@7span/shilp-vue/src/plugin.js";
import { SFieldValidate, SFormValidate } from "@7span/shilp-vue/src/plugin";
Vue.component("SFieldValidate", SFieldValidate);
Vue.component("SFormValidate", SFormValidate);

Vue.use(ShilpVue, {
  vueMaterialDesignIcons: {
    PlusCircleOutline: require("vue-material-design-icons/PlusCircleOutline")
      .default,
    MinusCircleOutline: require("vue-material-design-icons/MinusCircleOutline")
      .default
  }
});

/**
 * Vee Validate
 */
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en";
const rules = { required, email };
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule] // add its message
  });
}
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

import plugin from "./plugin.js";
Vue.use(plugin);

require("./scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
