<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import type { CourseWithInstructor } from '@/stores/admin';

const props = defineProps<{
  course: CourseWithInstructor | null;
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'deleted'): void;
}>();

const adminStore = useAdminStore();

const confirmDelete = async () => {
  if (!props.course) return;

  try {
    await adminStore.deleteCourse(props.course.id);
    emit('deleted');
    emit('close');
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Delete Course</h2>
      <p v-if="course">
        Are you sure you want to delete "{{ course.title }}"? This action cannot be undone.
      </p>
      <div class="modal-actions">
        <button class="btn-secondary" @click="$emit('close')">Cancel</button>
        <button class="btn-danger" @click="confirmDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: var(--bg-white);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 4);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.modal h2 {
  margin-bottom: calc(var(--spacing-unit) * 3);
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 4);
}

.btn-secondary,
.btn-danger {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
}

.btn-secondary {
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.btn-secondary:hover {
  background-color: var(--border-color);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

/* Dark mode styles */
html.dark .modal {
  background-color: #1f2937;
}

html.dark .modal h2 {
  color: #f9fafb;
}

html.dark .btn-secondary {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .btn-secondary:hover {
  background-color: #4b5563;
}
</style>
