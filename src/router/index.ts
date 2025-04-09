import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue")
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CoursesView.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue")
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (localStorage.getItem('token')) {
      next({ name: 'dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
