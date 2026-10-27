// router.js
const { createRouter, createWebHistory } = require("vue-router");
const Index = require("./item/index.vue").default; // .default is needed for Vue SFC

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

module.exports = router;