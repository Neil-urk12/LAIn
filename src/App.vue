<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { ref, computed, onBeforeUnmount, onMounted } from "vue";
import SideBar from "./components/Global/SideBar.vue";
import { useAuthStore } from "./stores/auth";
import { pb } from "./pocketbase/pocketbase";

const route = useRoute();
const isSidebarCollapsed = ref(true);
const auth = useAuthStore();

const showSidebar = computed(() => {
  const hiddenRoutes = ["home", "login", "about", "admin", "not-found"];
  return !hiddenRoutes.includes(route.name as string);
});

function markSessionInactive() {
  if (!auth.sessionId) return;
  const url = `${pb.baseURL}/api/collections/sessions/records/${auth.sessionId}`;
  const data = JSON.stringify({ isActive: false });
  navigator.sendBeacon(url, data);
}

onMounted(() => {
  window.addEventListener("beforeunload", markSessionInactive);
});
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", markSessionInactive);
});
</script>

<template>
  <div
    :class="[
      'app-container',
      {
        'sidebar-visible': showSidebar,
        'sidebar-collapsed': isSidebarCollapsed,
      },
    ]"
  >
    <SideBar
      class="overlaybar"
      v-if="showSidebar"
      @toggle-collapse="isSidebarCollapsed = $event"
    />
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
.overlaybar {
  z-index: 10000;
}

.app-container.sidebar-visible .main-content {
  margin-left: 240px;
}

.app-container.sidebar-visible.sidebar-collapsed .main-content {
  margin-left: 60px;
}

@media screen and (max-width: 768px) {
  .app-container.sidebar-visible.sidebar-collapsed .main-content {
    margin-left: 0px;
  }
  .app-container.sidebar-visible .main-content {
    margin-left: 0px;
  }
}
</style>
