<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAdminStore } from '@/stores/admin';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'created'): void;
}>();

const adminStore = useAdminStore();

// Form state
const userForm = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: 'student',
  verified: true,
  bio: '',
  company: '',
  position: '',
  linkedIn: '',
  website: '',
  isActive: true,
  learningStreak: 0
});

// Form errors
const errors = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  general: ''
});

// Loading state
const isSubmitting = ref(false);

// Validate form
const validateForm = () => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  // Validate name
  if (!userForm.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  // Validate username
  if (!userForm.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  }

  // Validate email
  if (!userForm.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate password
  if (!userForm.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (userForm.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    isValid = false;
  }

  // Validate password confirmation
  if (userForm.password !== userForm.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
};

// Submit form
const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  errors.general = '';

  try {
    const now = new Date().toISOString();

    const data = {
      ...userForm,
      emailVisibility: true,
      profilePicture: '',
      lastLoginDate: now,
      // Ensure all fields are included
      bio: userForm.bio,
      company: userForm.company,
      position: userForm.position,
      linkedIn: userForm.linkedIn,
      website: userForm.website,
      isActive: userForm.isActive,
      learningStreak: userForm.learningStreak
    };

    await adminStore.createUser(data);

    // Reset form
    Object.assign(userForm, {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: 'student',
      verified: true,
      bio: '',
      company: '',
      position: '',
      linkedIn: '',
      website: '',
      isActive: true,
      learningStreak: 0
    });

    emit('created');
    emit('close');
  } catch (error: unknown) {
    console.error('Error creating user:', error);

    // Handle specific API errors
    if (error && typeof error === 'object' && 'response' in error && 
        error.response && typeof error.response === 'object' && 'data' in error.response) {
      const responseData = error.response.data as Record<string, { message: string }>;

      if (responseData.email) {
        errors.email = responseData.email.message;
      }
      if (responseData.username) {
        errors.username = responseData.username.message;
      }
      if (responseData.password) {
        errors.password = responseData.password.message;
      }
    } else {
      errors.general = 'An error occurred while creating the user. Please try again.';
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Add New User</h2>

      <form @submit.prevent="submitForm" class="user-form">
        <div v-if="errors.general" class="error-message general-error">
          {{ errors.general }}
        </div>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="userForm.name"
            :class="{ 'error-input': errors.name }"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="userForm.username"
            :class="{ 'error-input': errors.username }"
          />
          <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="userForm.email"
            :class="{ 'error-input': errors.email }"
          />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="userForm.role">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="userForm.password"
            :class="{ 'error-input': errors.password }"
          />
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            v-model="userForm.passwordConfirm"
            :class="{ 'error-input': errors.passwordConfirm }"
          />
          <span v-if="errors.passwordConfirm" class="error-text">{{ errors.passwordConfirm }}</span>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="userForm.verified" />
            <span>Activate account immediately</span>
          </label>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="userForm.isActive" />
            <span>Set account as active</span>
          </label>
        </div>

        <div class="form-section">
          <h3>Additional Information</h3>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea id="bio" v-model="userForm.bio" rows="3"></textarea>
          </div>
          
          <div class="form-group">
            <label for="company">Company</label>
            <input type="text" id="company" v-model="userForm.company" />
          </div>
          
          <div class="form-group">
            <label for="position">Position</label>
            <input type="text" id="position" v-model="userForm.position" />
          </div>
          
          <div class="form-group">
            <label for="linkedIn">LinkedIn</label>
            <input type="text" id="linkedIn" v-model="userForm.linkedIn" />
          </div>
          
          <div class="form-group">
            <label for="website">Website</label>
            <input type="text" id="website" v-model="userForm.website" />
          </div>
          
          <div class="form-group">
            <label for="learningStreak">Learning Streak (days)</label>
            <input type="number" id="learningStreak" v-model="userForm.learningStreak" min="0" />
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Creating...' : 'Create User' }}
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

.user-form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 3);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: calc(var(--spacing-unit) * 1);
  color: var(--text-dark);
}

.form-group input,
.form-group select {
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: var(--bg-white);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.error-input {
  border-color: #ef4444 !important;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: calc(var(--spacing-unit) * 0.5);
}

.general-error {
  background-color: #fee2e2;
  color: #991b1b;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: 6px;
  font-size: 0.875rem;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
  cursor: pointer;
}

.checkbox-label input {
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 2);
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

html.dark .form-group label {
  color: #f3f4f6;
}

html.dark .form-group input,
html.dark .form-group select {
  background-color: #374151;
  border-color: #4b5563;
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

html.dark .general-error {
  background-color: #7f1d1d;
  color: #fecaca;
}
</style>
