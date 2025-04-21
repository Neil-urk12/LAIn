import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView/HomeView.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CoursesView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/courses/:id",
      name: "course",
      component: () => import("../views/CourseOverview.vue"),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/certificates",
      name: "certificates",
      component: () => import("../views/CertificatesView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/courses/:id/enroll",
      name: "Enrollment",
      component: () => import("../views/EnrollmentView.vue"),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/auth/:token",
      name: "verify-email",
      component: () => import("../views/VerifyEmailView.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { requiresAuth: false }
    }
  ],
});

// Initialize auth state from PocketBase
async function initializeAuthState() {
  const authStore = useAuthStore();
  // Use authStore's initAuth method
  return await authStore.initAuth();
}

router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.meta.requiresAuth !== false; // Default to requiring auth if not specified
  const authStore = useAuthStore();

  // Try to initialize auth state if not already authenticated
  if (!authStore.isAuthenticated) {
    await initializeAuthState();
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    // Route requires auth but user is not authenticated
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    // User is already logged in and trying to access login page
    next({ name: 'dashboard' });
  } else {
    // Either the route doesn't require auth, or the user is authenticated
    next();
  }
});

export default router;
