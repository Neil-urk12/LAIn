<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAdminStore } from '@/stores/admin';
import type { User } from '@/models/interfaces';

const props = defineProps<{
  user: User | null;
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'reset'): void;
}>();

const adminStore = useAdminStore();

// Form state
const passwordForm = reactive({
  newPassword: '',
  confirmPassword: ''
});

// Form errors
const errors = reactive({
  newPassword: '',
  confirmPassword: '',
  general: ''
});

// Loading state
const isSubmitting = ref(false);
const isSuccess = ref(false);

// Form validation
const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  errors.newPassword = '';
  errors.confirmPassword = '';
  errors.general = '';
  
  // Validate new password
  if (!passwordForm.newPassword) {
    errors.newPassword = 'New password is required';
    isValid = false;
  } else if (passwordForm.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters';
    isValid = false;
  }
  
  // Validate confirm password
  if (!passwordForm.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  
  if (!validateForm() || !props.user) return;
  
  isSubmitting.value = true;
  
  try {
    await adminStore.resetUserPassword(props.user.id, passwordForm.newPassword);
    
    // Reset form
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
    
    isSuccess.value = true;
    
    // Close modal after 2 seconds
    setTimeout(() => {
      emit('reset');
      emit('close');
      isSuccess.value = false;
    }, 2000);
  } catch (error) {
    if (error instanceof Error) {
      errors.general = error.message;
    } else {
      errors.general = 'An error occurred while resetting the password';
    }
    console.error('Error resetting password:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Reset Password</h2>
      
      <div v-if="isSuccess" class="success-message">
        Password has been reset successfully!
      </div>
      
      <form v-else @submit="handleSubmit">
        <div v-if="errors.general" class="error-message">{{ errors.general }}</div>
        
        <p v-if="user">
          Reset password for <strong>{{ user.name }}</strong>
        </p>
        
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input 
            type="password" 
            id="newPassword" 
            v-model="passwordForm.newPassword" 
            :class="{ 'error': errors.newPassword }"
          />
          <div v-if="errors.newPassword" class="error-text">{{ errors.newPassword }}</div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="passwordForm.confirmPassword" 
            :class="{ 'error': errors.confirmPassword }"
          />
          <div v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</div>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Resetting...' : 'Reset Password' }}
          </button>
        </div>
      </form>
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

.modal p {
  margin-bottom: calc(var(--spacing-unit) * 3);
  color: var(--text-medium);
  line-height: 1.5;
}

.form-group {
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.form-group label {
  display: block;
  margin-bottom: calc(var(--spacing-unit) * 1);
  font-weight: 500;
  color: var(--text-medium);
}

.form-group input {
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.form-group input.error {
  border-color: #ef4444;
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: calc(var(--spacing-unit) * 0.5);
}

.error-message {
  background-color: #fee2e2;
  color: #991b1b;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: 6px;
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.success-message {
  background-color: #d1fae5;
  color: #065f46;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: 6px;
  margin-bottom: calc(var(--spacing-unit) * 3);
  text-align: center;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 4);
}

.btn-primary,
.btn-secondary {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
}

.btn-primary:disabled {
  background-color: var(--primary-color);
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.btn-secondary:hover {
  background-color: var(--border-color);
}

/* Dark mode styles */
html.dark .modal {
  background-color: #1f2937;
}

html.dark .modal h2 {
  color: #f9fafb;
}

html.dark .modal p {
  color: #d1d5db;
}

html.dark .form-group label {
  color: #f3f4f6;
}

html.dark .form-group input {
  background-color: #111827;
  border-color: #374151;
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

html.dark .error-message {
  background-color: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

html.dark .success-message {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}
</style>
