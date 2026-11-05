// router.js
const Vue = require("vue");
const VueRouter = require("vue-router");
const Index = require("./Index.vue").default; // .default needed for SFC

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
  },
];

const router = new VueRouter({
  routes,
});

module.exports = router;