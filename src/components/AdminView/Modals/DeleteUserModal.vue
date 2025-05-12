<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '@/models/interfaces';
import { useAdminStore } from '@/stores/admin';
import { Loader } from 'lucide-vue-next';

const props = defineProps<{
  show: boolean;
  user: User | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'deleted'): void;
}>();

const adminStore = useAdminStore();
const isDeleting = ref(false);
const deleteError = ref<string | null>(null);

const confirmDelete = async () => {
  if (!props.user) return;

  isDeleting.value = true;
  deleteError.value = null;

  try {
    await adminStore.deleteUser(props.user.id);
    emit('deleted'); // Signal success
    emit('close'); // Close the modal
  } catch (error: any) {
    console.error("Error deleting user:", error);
    deleteError.value = error.message || 'An unknown error occurred while deleting the user.';
    // Optionally re-throw or handle specific errors if needed
  } finally {
    isDeleting.value = false;
  }
};

const closeModal = () => {
  if (!isDeleting.value) {
    deleteError.value = null; // Clear error on close
    emit('close');
  }
}
</script>

<template>
  <div v-if="show && user" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Delete User</h2>
      <p>
        Are you sure you want to delete the user <strong>{{ user.name }}</strong> ({{ user.email }})?
        This action cannot be undone.
      </p>

      <div v-if="deleteError" class="error-message general-error">
        {{ deleteError }}
      </div>

      <div class="modal-actions">
        <button type="button" class="btn-secondary" @click="closeModal" :disabled="isDeleting">
          Cancel
        </button>
        <button
          type="button"
          class="btn-danger"
          @click="confirmDelete"
          :disabled="isDeleting"
        >
          <Loader v-if="isDeleting" :size="16" class="loading-spinner-inline" />
          {{ isDeleting ? 'Deleting...' : 'Delete User' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reusing styles from AddUserModal where applicable */
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
  max-width: 450px; /* Slightly smaller for confirmation */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.modal h2 {
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-size: 1.25rem;
  font-weight: 600;
}

.modal p {
  margin-bottom: calc(var(--spacing-unit) * 3);
  color: var(--text-medium);
  line-height: 1.6;
}

.modal p strong {
    color: var(--text-dark);
    font-weight: 600;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 2);
}

.btn-secondary, .btn-danger {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-secondary {
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--border-color);
}

.btn-danger {
  background-color: #ef4444; /* Red */
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626; /* Darker red */
}

.btn-danger:disabled, .btn-secondary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner-inline {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.general-error {
  background-color: #fee2e2;
  color: #991b1b;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: calc(var(--spacing-unit) * 3);
}

/* Dark mode styles */
html.dark .modal {
  background-color: #1f2937;
}

html.dark .modal h2,
html.dark .modal p strong {
  color: #f9fafb;
}

html.dark .modal p {
    color: #9ca3af;
}

html.dark .btn-secondary {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

html.dark .general-error {
  background-color: #7f1d1d;
  color: #fecaca;
}
</style>
