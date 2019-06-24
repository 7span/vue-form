import Vue from "vue";
import App from "./App.vue";

import plugin from "./plugin";
Vue.use(plugin);

require("styles/scss/styles.scss");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
