import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import Nprogress from 'nprogress';
import {useUserStore} from "@/stores/user.ts";
const router = createRouter({
  history: createWebHashHistory(),
  //使用history打包后会变空白
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/user/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/user/RegisterView.vue"),
    },
    {
      path: "/userCenter",
      name: "UserCenter",
      component: () => import("@/views/user/UserCenterView.vue"),
    },
    {
      path: "/robustness",
      name: "Robustness",
      component: () => import("@/views/robustness/RobustnessView.vue"),
    },
    {
      path: "/template",
      name: "Template",
      component: () => import("@/views/template/TemplateView.vue"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  const userStore = useUserStore();

  if(localStorage.getItem("user")){
    userStore.updateUser(JSON.parse(localStorage.getItem("user") as string));
  }

  // if (to.name != "Login" && to.name != "Register" && userStore.id == "") {
  //   next("/login");
  //   return;
  // }
  //
  // if ((to.name == "Login" || to.name == "Register") && userStore.id != "") {
  //   next("/userCenter");
  //   return;
  // }
  next();
});

router.afterEach(to => {
  Nprogress.done();
});

export default router;
