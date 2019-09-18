import Vue from "vue";
import App from "./App.vue";

import plugin from "./plugin.js";
Vue.use(plugin);

require("@7span/shilp/scss/styles.scss");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
