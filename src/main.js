import Vue from "vue";
import App from "./App.vue";

import plugin from "./plugin.js";
Vue.use(plugin);

require("./scss/style.scss");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
