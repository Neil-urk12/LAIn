<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const props = defineProps<{
  items: string[]
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void
}>();

const activeTab = ref(0);

const setActiveTab = (index: number) => {
  const newActiveTabName = props.items[index];
  activeTab.value = index;
  emit('update:activeTab', newActiveTabName);
};
</script>

<template>
  <nav class="settings-mini-nav">
    <a
      v-for="(item, index) in items"
      :key="index"
      href="#"
      :class="['mini-nav-link', { active: activeTab === index }]"
      @click.prevent="setActiveTab(index)"
    >
      {{ item }}
    </a>
  </nav>
</template>

<style scoped>
.settings-mini-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

.mini-nav-link {
  position: relative;
  padding: 0.5rem 0;
  font-weight: 500;
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mini-nav-link:hover {
  color: var(--primary-color);
}

.mini-nav-link.active {
  color: var(--text-dark);
}

.mini-nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: var(--text-dark);
  border-radius: 1px;
}

@media (max-width: 768px) {
  .settings-mini-nav {
    padding: 0.5rem;
    margin: -0.5rem 0rem 1.5rem 0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    background: var(--bg-white);
    border-bottom: 1px solid var(--border-color);
    top: 0;
    z-index: 10;
  }

  .settings-mini-nav::-webkit-scrollbar {
    display: none;
  }

  .mini-nav-link {
    white-space: nowrap;
    padding: 0.75rem 1rem;
  }
}
</style>
