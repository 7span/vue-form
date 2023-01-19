import { createApp } from "vue";
import App from "./App.vue";
import plugin from "./plugin.js";

const app = createApp(App);

app.use(plugin);
app.config.productionTip = false;

app.mount("#app");
