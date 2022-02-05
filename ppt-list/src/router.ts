import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./components/Home.vue";
import About from "./components/About.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about/:id",
    component: About,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
