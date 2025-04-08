<template>
  <button class="theme-toggle-btn" aria-label="Toggle theme">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemeToggleButton' })
</script>

<style scoped>
.theme-toggle-btn {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.theme-toggle-btn:hover {
  background: #f3f4f6;
  border-color: #999;
}
</style>
