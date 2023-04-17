import { createRouter, createWebHashHistory } from "vue-router";
import { isAuthenticated } from "~/auth.js";

import Index from "~/pages/index.vue";
import Login from "~/pages/login.vue";
import NotFound from "~/pages/404.vue";

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/login",
    component: Login,
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && isAuthenticated()) {
    next("/");
  } else if (to.path !== "/login" && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
