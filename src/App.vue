<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import SideBar from './components/SideBar.vue'

const route = useRoute()
const isSidebarCollapsed = ref(true)

const showSidebar = computed(() => {
  const hiddenRoutes = ['home', 'login']
  return !hiddenRoutes.includes(route.name as string)
})
</script>

<template>
  <div :class="['app-container', { 'sidebar-visible': showSidebar, 'sidebar-collapsed': isSidebarCollapsed }]">
    <SideBar v-if="showSidebar" @toggle-collapse="isSidebarCollapsed = $event" />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
  margin-left: 0;
}

.app-container.sidebar-visible .main-content {
  margin-left: 140px;
}

.app-container.sidebar-visible.sidebar-collapsed .main-content {
  margin-left: 30px;
}
</style>
