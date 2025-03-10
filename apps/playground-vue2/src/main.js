import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import plugin from "@7span/vue-form/src/main";

Vue.use(plugin);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
