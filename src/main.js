import Vue from "vue";
import App from "./App.vue";

import plugin from "./plugin";
Vue.use(plugin);

require("styles/scss/styles.scss");

Vue.config.productionTip = false;

//This is recursive component, hence defined globally.
Vue.component("Fields", require("@/plugin/components/fields.vue").default);

new Vue({
  render: h => h(App)
}).$mount("#app");
