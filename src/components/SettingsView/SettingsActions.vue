<template>
  <div class="form-actions">
    <button @click="onSave" class="btn btn-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="icon-margin">
        <path d="M8 1a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V5.5a.5.5 0 0 1-1 0V4H6a.5.5 0 0 1 0-1h1.5V1.5A.5.5 0 0 1 8 1zM.5 3h15a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5zM1 3.5v8h14v-8H1z"/>
      </svg>
      Save Changes
    </button>
    <button @click="onLogout" class="btn btn-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" class="icon-margin">
        <path d="M16 13v-2H7v2h9zm-4-9C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
      Log Out
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'save'): void
  (e: 'logout'): void
}>();

const onSave = () => emit('save');
const onLogout = () => emit('logout');
</script>

<style scoped>
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.5;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--primary-color-dark);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-light);
}

.icon-margin {
  margin-right: 0.75rem;
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    width: 100%;
  }
}
</style>
