<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { BookOpen, LayoutGrid, Calendar, MessageSquare, FileText, CreditCard, Settings } from 'lucide-vue-next'

defineOptions({ name: 'AppSidebar' })

const emit = defineEmits<{
  (e: 'toggle-collapse', value: boolean): void
}>()

const isCollapsed = ref(true)

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
        <li class="active">
          <LayoutGrid :size="18" color="#059669" />
          <span v-show="!isCollapsed">Dashboard</span>
        </li>
        <li>
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
        <li>
          <FileText :size="18" color="#059669" />
          <span v-show="!isCollapsed">Certificates</span>
        </li>
        <li>
          <CreditCard :size="18" color="#059669" />
          <span v-show="!isCollapsed">Billing</span>
        </li>
        <li>
          <Settings :size="18" color="#059669" />
          <span v-show="!isCollapsed">Settings</span>
        </li>
      </ul>
    </nav>

  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: #f8f9fa;
  height: 100vh;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
  overflow: hidden;
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
  background: #e2e6ea;
}

nav li.active {
  background: #d1fae5;
  color: #059669;
  font-weight: 600;
}

.icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
</style>
