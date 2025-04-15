<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <span class="logo">LAIn</span> <span class="logo-admin">Admin</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li v-for="item in navigation" :key="item.name" :class="{ 'active': item.active }">
            <a href="#">
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <div class="user-avatar">A</div>
        <div class="user-info">
          <span class="user-name">Admin User</span>
          <span class="user-email">admin@lain.edu</span>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header -->
      <header class="main-header">
        <div class="search-bar">
          <Search class="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div class="header-actions">
          <button class="icon-button notification-button">
            <Bell class="header-icon" />
            <span class="notification-dot"></span>
          </button>
          <button class="icon-button">
            <UserCircle class="header-icon profile-icon" />
          </button>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="dashboard-body">
        <h1 class="dashboard-title">Admin Dashboard</h1>
        <p class="dashboard-subtitle">Overview of your platform's performance and activity.</p>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.title" class="stat-card">
            <div class="stat-info">
              <p class="stat-title">{{ stat.title }}</p>
              <p class="stat-value">{{ stat.value.toLocaleString() }}</p>
              <p class="stat-change">
                <ArrowUp class="change-icon" />
                <span>{{ stat.change }}</span>
              </p>
            </div>
            <div class="stat-icon-wrapper">
              <component :is="stat.icon" class="stat-icon" />
            </div>
          </div>
        </div>

        <!-- Activity and Actions -->
        <div class="activity-actions-grid">
          <!-- Recent Activity -->
          <div class="recent-activity card">
            <h2 class="card-title">Recent Activity</h2>
            <ul class="activity-list">
              <li v-for="activity in recentActivity" :key="activity.id" class="activity-item">
                <div class="activity-avatar" :style="{ backgroundColor: activity.avatarColor }">
                  {{ activity.initials }}
                </div>
                <div class="activity-details">
                  <p>
                    <span class="font-semibold">{{ activity.userName }}</span>
                    {{ activity.action }}
                    <span v-if="activity.subject" class="font-semibold">{{ activity.subject }}</span>
                  </p>
                  <p class="activity-timestamp">{{ activity.timestamp }}</p>
                </div>
              </li>
            </ul>
            <a href="#" class="view-all-link">View all activity</a>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions card">
            <h2 class="card-title">Quick Actions</h2>
            <ul class="quick-actions-list">
              <li v-for="action in quickActions" :key="action.label">
                <button class="quick-action-button">{{ action.label }}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Home,
  Users,
  BookOpen,
  BarChart2,
  Settings,
  Search,
  Bell,
  UserCircle,
  ArrowUp,
  DollarSign,
} from 'lucide-vue-next';

// --- Data ---

const navigation = ref([
  { name: 'Dashboard', icon: Home, active: true },
  { name: 'Users', icon: Users, active: false },
  { name: 'Courses', icon: BookOpen, active: false },
  { name: 'Analytics', icon: BarChart2, active: false },
  { name: 'Settings', icon: Settings, active: false },
]);

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

// --- Methods ---
// Add methods here if needed for interactions, e.g., handling clicks on quick actions
</script>

<style scoped>
/* Use scoped styles for component-specific adjustments */
/* These styles complement the global CSS and potentially Tailwind */

.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-light, #f9fafb); /* Fallback color */
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: var(--bg-white, #ffffff);
  border-right: 1px solid var(--border-color, #e5e7eb);
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing-unit) * 3); /* 24px */
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding-bottom: calc(var(--spacing-unit) * 3); /* 24px */
  margin-bottom: calc(var(--spacing-unit) * 2); /* 16px */
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.logo {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: var(--primary-color, #10b981);
  margin-right: calc(var(--spacing-unit) * 0.5); /* 4px */
}
.logo-admin {
  font-size: 1.5rem; /* 24px */
  font-weight: 500;
  color: var(--text-dark, #1f2937);
}


.sidebar-nav {
  flex-grow: 1;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li a {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2); /* 12px 16px */
  border-radius: 6px;
  color: var(--text-light, #6b7280);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  margin-bottom: calc(var(--spacing-unit) * 0.5); /* 4px */
}

.sidebar-nav li a:hover {
  background-color: var(--bg-light, #f9fafb);
  color: var(--text-dark, #1f2937);
}

.sidebar-nav li.active a {
  background-color: #e6f9f2; /* Light green background for active */
  color: var(--primary-color-dark, #059669);
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: calc(var(--spacing-unit) * 1.5); /* 12px */
}

.sidebar-footer {
  margin-top: auto; /* Pushes footer to the bottom */
  padding-top: calc(var(--spacing-unit) * 2); /* 16px */
  border-top: 1px solid var(--border-color, #e5e7eb);
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color, #10b981);
  color: var(--bg-white, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-right: calc(var(--spacing-unit) * 1.5); /* 12px */
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: var(--text-dark, #1f2937);
  font-size: 0.875rem; /* 14px */
}

.user-email {
  font-size: 0.75rem; /* 12px */
  color: var(--text-light, #6b7280);
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
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4); /* 16px 32px */
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
  left: calc(var(--spacing-unit) * 1.5); /* 12px */
  width: 20px;
  height: 20px;
  color: var(--text-light, #6b7280);
}

.search-bar input {
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 5); /* 8px 12px 8px 40px */
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  min-width: 300px;
  font-size: 0.875rem; /* 14px */
}
.search-bar input:focus {
    outline: none;
    border-color: var(--primary-color, #10b981);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}


.header-actions {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 2); /* 16px */
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
    width: 32px; /* Slightly larger profile icon */
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
  background-color: #ef4444; /* Red */
  border-radius: 50%;
  border: 1px solid var(--bg-white, #ffffff);
}

/* Dashboard Body */
.dashboard-body {
  padding: calc(var(--spacing-unit) * 4); /* 32px */
  flex-grow: 1;
  overflow-y: auto; /* Allow scrolling if content overflows */
}

.dashboard-title {
  font-size: 1.875rem; /* 30px */
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 0.5); /* 4px */
}

.dashboard-subtitle {
  font-size: 1rem; /* 16px */
  color: var(--text-light, #6b7280);
  margin-bottom: calc(var(--spacing-unit) * 4); /* 32px */
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: calc(var(--spacing-unit) * 3); /* 24px */
  margin-bottom: calc(var(--spacing-unit) * 4); /* 32px */
}

.stat-card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3); /* 24px */
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to the top */
}

.stat-title {
  font-size: 0.875rem; /* 14px */
  color: var(--text-light, #6b7280);
  margin-bottom: calc(var(--spacing-unit) * 0.5); /* 4px */
}

.stat-value {
  font-size: 1.875rem; /* 30px */
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 1); /* 8px */
  line-height: 1.2;
}

.stat-change {
  font-size: 0.875rem; /* 14px */
  color: #10b981; /* Green for positive change */
  display: flex;
  align-items: center;
  font-weight: 500;
}

.change-icon {
  width: 16px;
  height: 16px;
  margin-right: calc(var(--spacing-unit) * 0.5); /* 4px */
}

.stat-icon-wrapper {
  background-color: #e6f9f2; /* Light green background */
  border-radius: 50%;
  padding: calc(var(--spacing-unit) * 1.5); /* 12px */
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color-dark, #059669);
}

/* Activity and Actions Grid */
.activity-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive columns */
  gap: calc(var(--spacing-unit) * 3); /* 24px */
  align-items: start; /* Align items to the top of the grid row */
}

.card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3); /* 24px */
}

.card-title {
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 2); /* 16px */
}

/* Recent Activity */
.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: calc(var(--spacing-unit) * 2); /* 16px */
}

.activity-item {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing-unit) * 1.5) 0; /* 12px top/bottom */
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}
.activity-item:last-child {
    border-bottom: none;
}


.activity-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--text-dark); /* Adjust color for better contrast on light backgrounds */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.875rem; /* 14px */
  margin-right: calc(var(--spacing-unit) * 1.5); /* 12px */
  flex-shrink: 0; /* Prevent shrinking */
}

.activity-details p {
  margin-bottom: 0;
  font-size: 0.875rem; /* 14px */
  color: var(--text-dark, #1f2937);
  line-height: 1.4;
}
.activity-details .font-semibold {
    font-weight: 600;
}

.activity-timestamp {
  font-size: 0.75rem; /* 12px */
  color: var(--text-light, #6b7280);
}

.view-all-link {
  display: inline-block;
  margin-top: calc(var(--spacing-unit) * 1); /* 8px */
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: var(--primary-color, #10b981);
  text-decoration: none;
}
.view-all-link:hover {
    color: var(--primary-color-dark, #059669);
}

/* Quick Actions */
.quick-actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 1.5); /* 12px */
}

.quick-action-button {
  display: block;
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2); /* 12px 16px */
  background-color: #e6f9f2; /* Light green background */
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--primary-color-dark, #059669);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.875rem; /* 14px */
}

.quick-action-button:hover {
  background-color: #d1fae5; /* Slightly darker green on hover */
  color: #047857;
}

/* Add dark mode styles if needed, leveraging html.dark */
html.dark .admin-dashboard {
    background-color: #111827; /* Dark background */
}
html.dark .sidebar {
    background-color: #1f2937; /* Darker sidebar */
    border-right-color: #374151;
}
html.dark .sidebar-header,
html.dark .sidebar-footer {
    border-color: #374151;
}
html.dark .logo-admin,
html.dark .user-name {
    color: #f9fafb; /* Light text */
}
html.dark .user-email {
    color: #9ca3af; /* Lighter gray */
}
html.dark .sidebar-nav li a {
    color: #d1d5db; /* Light gray nav text */
}
html.dark .sidebar-nav li a:hover {
    background-color: #374151; /* Darker hover */
    color: #ffffff;
}
html.dark .sidebar-nav li.active a {
    background-color: #064e3b; /* Darker green active */
    color: #a7f3d0; /* Lighter green text */
}
html.dark .main-header,
html.dark .stat-card,
html.dark .card {
    background-color: #1f2937; /* Dark card/header background */
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
    border-color: #1f2937; /* Match dark card background */
}
html.dark .dashboard-title,
html.dark .stat-value,
html.dark .card-title {
    color: #f9fafb; /* Light text */
}
html.dark .dashboard-subtitle,
html.dark .stat-title {
    color: #9ca3af; /* Lighter gray */
}
html.dark .stat-icon-wrapper {
    background-color: #064e3b; /* Darker green icon bg */
}
html.dark .stat-icon {
    color: #a7f3d0; /* Lighter green icon */
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
    /* Adjust avatar text color if needed based on background */
    color: #1f2739; /* Darker text might be needed on light avatars */
}
html.dark .view-all-link {
    color: #34d399; /* Brighter green link */
}
html.dark .view-all-link:hover {
    color: #a7f3d0;
}
html.dark .quick-action-button {
    background-color: #064e3b; /* Darker green button */
    color: #a7f3d0; /* Lighter green text */
}
html.dark .quick-action-button:hover {
    background-color: #047857;
    color: #ffffff;
}


</style>
