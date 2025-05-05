<script setup lang="ts">
import { ref, defineAsyncComponent, watch, onMounted } from 'vue';
import AdminSidebar from '@/components/AdminView/AdminSidebar.vue';
import AdminDashboard from '@/components/AdminView/AdminDashboard.vue';
const UserManagement = defineAsyncComponent(() => import('../components/AdminView/UserManagement.vue'));
const CourseManagement = defineAsyncComponent(() => import('../components/AdminView/CourseManagement.vue'));
import {
  Home,
  Users,
  BookOpen,
  BarChart2,
  Settings,
} from 'lucide-vue-next';
import { useAdminStore } from '@/stores/admin';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const adminStore = useAdminStore();
const authStore = useAuthStore();
const router = useRouter();
const activeView = ref('dashboard');
const isSidebarCollapsed = ref(false);
const navigation = ref([
  { name: 'Dashboard', icon: Home, active: true, view: 'dashboard' },
  { name: 'Users', icon: Users, active: false, view: 'users' },
  { name: 'Courses', icon: BookOpen, active: false, view: 'courses' },
  { name: 'Analytics', icon: BarChart2, active: false, view: 'analytics' },
  { name: 'Settings', icon: Settings, active: false, view: 'settings' },
]);

const updateActiveNav = (view: string) => {
  navigation.value = navigation.value.map(item => ({
    ...item,
    active: item.view === view
  }));
  activeView.value = view;

  // Fetch data based on the active view
  if (view === 'users' && !adminStore.users.length) {
    adminStore.fetchUsers();
  }

  if (view === 'courses' && !adminStore.courses.length) {
    adminStore.fetchCourses();
  }
};

watch(activeView, (newView) => {
  updateActiveNav(newView);
});

// Fetch data when component is mounted
onMounted(async () => {
  // Initialize auth if needed
  if (!authStore.isAuthenticated) {
    await authStore.initAuth();
  }

  // Check if user is authenticated and has admin role
  if (!authStore.isAuthenticated || (authStore.getUser?.role !== 'admin')) {
    // Redirect non-admin users to dashboard
    router.push('/dashboard');
    return;
  }

  // Fetch stats and recent activity for the dashboard
  await Promise.all([
    adminStore.fetchStats(),
    adminStore.fetchRecentActivity()
  ]);
});

</script>

<template>
  <div :class="['admin-dashboard', { 'sidebar-collapsed': isSidebarCollapsed }]">
    <AdminSidebar
      :navigation="navigation"
      @nav-click="updateActiveNav"
      @toggle-collapse="isSidebarCollapsed = $event"
    />

    <div class="main-content">
      <AdminDashboard
        v-if="activeView === 'dashboard'"
        :stats="adminStore.stats"
        :recentActivity="adminStore.recentActivity"
        :quickActions="adminStore.quickActions"
      />

      <UserManagement
        v-if="activeView === 'users'"
        :users="adminStore.users"
        :loading="adminStore.loading.users"
      />

      <CourseManagement
        v-if="activeView === 'courses'"
        :courses="adminStore.courses"
        :loading="adminStore.loading.courses"
      />
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-light, #f9fafb);
  transition: padding-left 0.3s ease;
}

.admin-dashboard.sidebar-collapsed .main-content {
  margin-left: 40px; /* Width of the collapsed sidebar with just the toggle button */
}

/* Main Content Area */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: margin-left 0.3s ease;
}

/* Header */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
  background-color: var(--bg-white, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: calc(var(--spacing-unit) * 1.5);
  width: 20px;
  height: 20px;
  color: var(--text-light, #6b7280);
}

.search-bar input {
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 5);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  min-width: 300px;
  font-size: 0.875rem;
}
.search-bar input:focus {
    outline: none;
    border-color: var(--primary-color, #10b981);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}


.header-actions {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 2);
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-light, #6b7280);
  position: relative;
}
.icon-button:hover {
    color: var(--text-dark, #1f2937);
}

.header-icon {
  width: 24px;
  height: 24px;
}
.profile-icon {
    width: 32px;
    height: 32px;
}

.notification-button {
  position: relative;
}

.notification-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  border: 1px solid var(--bg-white, #ffffff);
}

.dashboard-body {
  padding: calc(var(--spacing-unit) * 4);
  flex-grow: 1;
  overflow-y: auto;
}

.dashboard-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.dashboard-subtitle {
  font-size: 1rem;
  color: var(--text-light, #6b7280);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.stat-card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-title {
  font-size: 0.875rem;
  color: var(--text-light, #6b7280);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 1);
  line-height: 1.2;
}

.stat-change {
  font-size: 0.875rem;
  color: #10b981;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.change-icon {
  width: 16px;
  height: 16px;
  margin-right: calc(var(--spacing-unit) * 0.5);
}

.stat-icon-wrapper {
  background-color: #e6f9f2;
  border-radius: 50%;
  padding: calc(var(--spacing-unit) * 1.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color-dark, #059669);
}

.activity-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  align-items: start;
}

.card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.activity-item {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing-unit) * 1.5) 0;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}
.activity-item:last-child {
    border-bottom: none;
}


.activity-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.875rem;
  margin-right: calc(var(--spacing-unit) * 1.5);
  flex-shrink: 0;
}

.activity-details p {
  margin-bottom: 0;
  font-size: 0.875rem;
  color: var(--text-dark, #1f2937);
  line-height: 1.4;
}
.activity-details .font-semibold {
    font-weight: 600;
}

.activity-timestamp {
  font-size: 0.75rem;
  color: var(--text-light, #6b7280);
}

.view-all-link {
  display: inline-block;
  margin-top: calc(var(--spacing-unit) * 1);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-color, #10b981);
  text-decoration: none;
}
.view-all-link:hover {
    color: var(--primary-color-dark, #059669);
}

.quick-actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 1.5);
}

.quick-action-button {
  display: block;
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
  background-color: #e6f9f2;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--primary-color-dark, #059669);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.875rem;
}

.quick-action-button:hover {
  background-color: #d1fae5;
  color: #047857;
}

html.dark .admin-dashboard {
    background-color: #111827;
}
html.dark .main-header,
html.dark .stat-card,
html.dark .card {
    background-color: #1f2937;
    border-color: #374151;
}
html.dark .main-header {
    border-bottom-color: #374151;
}
html.dark .search-bar input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
}
html.dark .search-bar input::placeholder {
    color: #9ca3af;
}
html.dark .search-icon,
html.dark .icon-button {
    color: #9ca3af;
}
html.dark .icon-button:hover {
    color: #f9fafb;
}
html.dark .notification-dot {
    border-color: #1f2937;
}
html.dark .dashboard-title,
html.dark .stat-value,
html.dark .card-title {
    color: #f9fafb;
}
html.dark .dashboard-subtitle,
html.dark .stat-title {
    color: #9ca3af;
}
html.dark .stat-icon-wrapper {
    background-color: #064e3b;
}
html.dark .stat-icon {
    color: #a7f3d0;
}
html.dark .activity-item {
    border-bottom-color: #374151;
}
html.dark .activity-details p {
    color: #f3f4f6;
}
html.dark .activity-timestamp {
    color: #9ca3af;
}
html.dark .activity-avatar {
    color: #1f2739;
}
html.dark .view-all-link {
    color: #34d399;
}
html.dark .view-all-link:hover {
    color: #a7f3d0;
}
html.dark .quick-action-button {
    background-color: #064e3b;
    color: #a7f3d0;
}
html.dark .quick-action-button:hover {
    background-color: #047857;
    color: #ffffff;
}
</style>
