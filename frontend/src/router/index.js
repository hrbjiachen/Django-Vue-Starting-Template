import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      System.import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
