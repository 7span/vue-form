import { createRouter, createWebHistory } from "vue-router";
import Index from "./item/index.vue";

const routes = [
  {
    path: "/item/:itemId",
    name: "item",
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
