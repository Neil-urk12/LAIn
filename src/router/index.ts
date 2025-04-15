import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView/HomeView.vue";

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
      path: "/courses/:id",
      name: "course",
      component: () => import("../views/CourseDashboardView.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue")
    },
    {
      path: "/certificates",
      name: "certificates",
      component: () => import("../views/CertificatesView.vue")
    },
    {
      path: "/courses/:id/enroll",
      name: "Enrollment",
      component: () => import("../views/EnrollmentView.vue"),
      props: true
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue")
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
