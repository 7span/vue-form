import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import plugin from "@7span/vue-form/src/main";

const app = createApp(App);
app.use(router);
app.use(plugin);
app.mount("#app");
