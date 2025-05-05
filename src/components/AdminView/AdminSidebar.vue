<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <span class="logo">LAIn</span> <span class="logo-admin">Admin</span>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in navigation"
          :key="item.name"
          :class="{ 'active': item.active }"
        >
          <a href="#" @click.prevent="handleNavClick(item.view)">
            <component :is="item.icon" class="nav-icon" />
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <div class="user-avatar" v-if="authStore.isAuthenticated">
        {{ getUserInitials }}
      </div>
      <div class="user-avatar" v-else>?</div>
      <div class="user-info">
        <span class="user-name">{{ authStore.getName || 'Guest User' }}</span>
        <span class="user-email">{{ authStore.getEmail || 'Not logged in' }}</span>
      </div>
      <button class="logout-btn" @click="handleLogout" title="Logout">
        <LogOut :size="18" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { LogOut } from 'lucide-vue-next';

const emit = defineEmits(['nav-click']);
const authStore = useAuthStore();
const router = useRouter();

defineProps<{
  navigation: Array<{
    name: string;
    icon: Component;
    active: boolean;
    view: string;
  }>;
}>();

const getUserInitials = computed(() => {
  if (!authStore.getName) return '?';

  const nameParts = authStore.getName.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }
  return nameParts[0].substring(0, 2).toUpperCase();
});

const handleNavClick = (view: string) => {
  emit('nav-click', view);
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
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
  position: relative;
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
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.user-name {
  font-weight: 500;
  color: var(--text-dark, #1f2937);
  font-size: 0.875rem; /* 14px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.75rem; /* 12px */
  color: var(--text-light, #6b7280);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  background: none;
  border: none;
  color: var(--text-light, #6b7280);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(var(--spacing-unit) * 1);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.logout-btn:hover {
  background-color: var(--bg-light, #f9fafb);
  color: var(--primary-color, #10b981);
}

/* Dark mode styles */
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

html.dark .logout-btn {
  color: #9ca3af; /* Lighter gray in dark mode */
}

html.dark .logout-btn:hover {
  background-color: #374151; /* Darker hover in dark mode */
  color: #a7f3d0; /* Lighter green text */
}
</style>
