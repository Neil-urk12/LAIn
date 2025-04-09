<script setup lang="ts">
import { ref, defineEmits, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { BookOpen, LayoutGrid, Calendar, MessageSquare, FileText, CreditCard, Settings } from 'lucide-vue-next'
const ThemeToggleButton = defineAsyncComponent(() => import('./ThemeToggleButton.vue'))

defineOptions({ name: 'SideBar' })

const emit = defineEmits<{
  (e: 'toggle-collapse', value: boolean): void
}>()

const isCollapsed = ref(true)

const route = useRoute()

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-collapse', isCollapsed.value)
}
</script>

<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]" :style="{ padding: isCollapsed ? '5px' : '20px' }">
    <div class="logo">
      <BookOpen v-show="!isCollapsed" :size="20" color="#059669" style="margin-right: 6px;" />
      <span v-show="!isCollapsed">LAIn</span>
      <button class="toggle-btn" @click="toggleSidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          :style="{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', marginTop: isCollapsed ? '10px' : '0px', marginRight: isCollapsed ? '10px' : '0px' }"
        >
          <path d="M9 6l6 6-6 6" stroke="#059669" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <nav>
      <ul>
        <li :class="{ active: route.path === '/dashboard' }" @click="$router.push('/dashboard')">
          <LayoutGrid :size="18" color="#059669" />
          <span v-show="!isCollapsed">Dashboard</span>
        </li>
        <li :class="{ active: route.path === '/courses' }" @click="$router.push('/courses')">
          <BookOpen :size="18" color="#059669" />
          <span v-show="!isCollapsed">My Courses</span>
        </li>
        <li>
          <Calendar :size="18" color="#059669" />
          <span v-show="!isCollapsed">Calendar</span>
        </li>
        <li>
          <MessageSquare :size="18" color="#059669" />
          <span v-show="!isCollapsed">Messages</span>
        </li>
        <li :class="{ active: route.path === '/certificates' }" @click="$router.push('/certificates')">
          <FileText :size="18" color="#059669" />
          <span v-show="!isCollapsed">Certificates</span>
        </li>
        <li>
          <CreditCard :size="18" color="#059669" />
          <span v-show="!isCollapsed">Billing</span>
        </li>
        <li :class="{ active: route.path === '/settings' }" @click="$router.push('/settings')">
          <Settings :size="18" color="#059669" />
          <span v-show="!isCollapsed">Settings</span>
        </li>
      </ul>
    </nav>

    <div class="sidebar-bottom">
      <div class="appearance" :style="{ justifyContent: isCollapsed ? 'center' : 'space-between' }">
        <span v-show="!isCollapsed">Appearance</span>
        <ThemeToggleButton />
      </div>
      <div class="user-card">
        <div class="avatar"></div>
        <div class="user-info" v-show="!isCollapsed">
          <div class="name">John Doe</div>
          <div class="email">john.doe@example.com</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: var(--bg-light);
  height: 100vh;
  box-sizing: border-box;
  border-right: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
  overflow: hidden;

  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 60px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

nav li:hover {
  background: var(--section-background);
}

nav li.active {
  background: var(--primary-color);
  color: var(--bg-white);
  font-weight: 600;
}

.icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.sidebar-bottom {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.appearance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-dark);
}

.theme-toggle {
  background: var(--section-background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--section-background);
  padding: 8px;
  border-radius: 8px;
}

.avatar {
  width: 30px;
  height: 30px;
  background: var(--border-color);
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 14px;
}

.email {
  font-size: 12px;
  color: var(--text-light);
}
</style>
