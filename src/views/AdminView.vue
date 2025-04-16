<script setup lang="ts">
import { ref, defineAsyncComponent, watch } from 'vue';
import AdminSidebar from '@/components/AdminView/AdminSidebar.vue';
import AdminDashboard from '@/components/AdminView/AdminDashboard.vue';
const UserManagement = defineAsyncComponent(() => import('@/components/AdminView/UserManagement.vue'));
import {
  Home,
  Users,
  BookOpen,
  BarChart2,
  Settings,
  DollarSign,
} from 'lucide-vue-next';


const activeView = ref('dashboard');
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
};

watch(activeView, (newView) => {
  updateActiveNav(newView);
});

const stats = ref([
  { title: 'Total Users', value: 2543, change: '+12.5%', icon: Users },
  { title: 'Total Courses', value: 48, change: '+4.2%', icon: BookOpen },
  { title: 'Active Enrollments', value: 1875, change: '+18.7%', icon: BarChart2 },
  { title: 'Revenue', value: 12450, change: '+8.3%', icon: DollarSign },
]);

const recentActivity = ref([
  { id: 1, initials: 'JD', userName: 'Jan Cez', action: 'enrolled in', subject: 'AI Fundamentals', timestamp: '5 minutes ago', avatarColor: '#86efac' }, // light green
  { id: 2, initials: 'JS', userName: 'Jane Rosalijos', action: 'completed lesson', subject: 'Introduction to Machine Learning', timestamp: '30 minutes ago', avatarColor: '#93c5fd' }, // light blue
  { id: 3, initials: 'RJ', userName: 'Standik Rosalijos', action: 'earned certificate for', subject: 'Python for Data Science', timestamp: 'about 1 hour ago', avatarColor: '#fca5a5' }, // light red
  { id: 4, initials: 'ED', userName: 'Emiligma Morales', action: 'created account', subject: null, timestamp: 'about 2 hours ago', avatarColor: '#c4b5fd' }, // light purple
  { id: 5, initials: 'MW', userName: 'Bro bro', action: 'submitted assignment for', subject: 'Deep Learning Applications', timestamp: 'about 3 hours ago', avatarColor: '#fdba74' }, // light orange
]);

const quickActions = ref([
  { label: 'Create New Course' },
  { label: 'Add New User' },
  { label: 'View Analytics' },
  { label: 'System Settings' },
]);

</script>

<template>
  <div class="admin-dashboard">
    <AdminSidebar
      :navigation="navigation"
      @nav-click="updateActiveNav"
    />
    
    <AdminDashboard
      v-if="activeView === 'dashboard'"
      :stats="stats"
      :recentActivity="recentActivity"
      :quickActions="quickActions"
    />
    
    <UserManagement
      v-if="activeView === 'users'"
    />
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-light, #f9fafb);
}


/* Main Content Area */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
