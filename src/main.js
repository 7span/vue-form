import Vue from "vue";
import App from "./App.vue";
import ShilpVue from "@7span/shilp-vue/src/plugin.js";

Vue.use(ShilpVue, {
  vueMaterialDesignIcons: {
    PlusCircleOutline: require("vue-material-design-icons/PlusCircleOutline")
      .default,
    MinusCircleOutline: require("vue-material-design-icons/MinusCircleOutline")
      .default
  }
});

import plugin from "./plugin.js";
Vue.use(plugin);

require("./scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
