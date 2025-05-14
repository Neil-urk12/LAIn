<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useAdminStore } from '@/stores/admin';
import type { User } from '@/models/interfaces';

const props = defineProps<{
  user: User | null;
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const adminStore = useAdminStore();

// Form state
const userForm = reactive({
  name: '',
  username: '',
  email: '',
  role: '',
  verified: false,
  learningStreak: 0,
  bio: '',
  company: '',
  position: '',
  linkedIn: '',
  website: '',
  isActive: true
});

// Form errors
const errors = reactive({
  name: '',
  username: '',
  email: '',
  general: ''
});

// Loading state
const isSubmitting = ref(false);

// Watch for changes in the user prop to update the form
watch(() => props.user, (newUser) => {
  if (newUser) {
    userForm.name = newUser.name;
    userForm.username = newUser.username;
    userForm.email = newUser.email;
    userForm.role = newUser.role;
    userForm.verified = newUser.verified;
    userForm.learningStreak = newUser.learningStreak;
    userForm.bio = newUser.bio || '';
    userForm.company = newUser.company || '';
    userForm.position = newUser.position || '';
    userForm.linkedIn = newUser.linkedIn || '';
    userForm.website = newUser.website || '';
    userForm.isActive = newUser.isActive;
  }
}, { immediate: true });

// Form validation
const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  errors.name = '';
  errors.username = '';
  errors.email = '';
  errors.general = '';
  
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
  } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
    errors.email = 'Email is invalid';
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
    const data = {
      name: userForm.name,
      username: userForm.username,
      email: userForm.email,
      role: userForm.role,
      verified: userForm.verified,
      learningStreak: userForm.learningStreak,
      bio: userForm.bio,
      company: userForm.company,
      position: userForm.position,
      linkedIn: userForm.linkedIn,
      website: userForm.website,
      isActive: userForm.isActive
    };
    
    await adminStore.updateUser(props.user.id, data);
    
    emit('updated');
    emit('close');
  } catch (error) {
    if (error instanceof Error) {
      errors.general = error.message;
    } else {
      errors.general = 'An error occurred while updating the user';
    }
    console.error('Error updating user:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Edit User</h2>
      
      <form @submit="handleSubmit">
        <div v-if="errors.general" class="error-message">{{ errors.general }}</div>
        
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="userForm.name" 
            :class="{ 'error': errors.name }"
          />
          <div v-if="errors.name" class="error-text">{{ errors.name }}</div>
        </div>
        
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="userForm.username" 
            :class="{ 'error': errors.username }"
          />
          <div v-if="errors.username" class="error-text">{{ errors.username }}</div>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="userForm.email" 
            :class="{ 'error': errors.email }"
          />
          <div v-if="errors.email" class="error-text">{{ errors.email }}</div>
        </div>
        
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="userForm.role">
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="status">Account Status</label>
          <div class="toggle-container">
            <label class="toggle">
              <input type="checkbox" v-model="userForm.isActive">
              <span class="slider"></span>
            </label>
            <span>{{ userForm.isActive ? 'Active' : 'Inactive' }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="verified">Email Verification</label>
          <div class="toggle-container">
            <label class="toggle">
              <input type="checkbox" v-model="userForm.verified">
              <span class="slider"></span>
            </label>
            <span>{{ userForm.verified ? 'Verified' : 'Unverified' }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="learningStreak">Learning Streak (days)</label>
          <input 
            type="number" 
            id="learningStreak" 
            v-model="userForm.learningStreak" 
            min="0"
          />
        </div>
        
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea 
            id="bio" 
            v-model="userForm.bio" 
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="company">Company</label>
          <input 
            type="text" 
            id="company" 
            v-model="userForm.company"
          />
        </div>
        
        <div class="form-group">
          <label for="position">Position</label>
          <input 
            type="text" 
            id="position" 
            v-model="userForm.position"
          />
        </div>
        
        <div class="form-group">
          <label for="linkedIn">LinkedIn</label>
          <input 
            type="text" 
            id="linkedIn" 
            v-model="userForm.linkedIn"
          />
        </div>
        
        <div class="form-group">
          <label for="website">Website</label>
          <input 
            type="text" 
            id="website" 
            v-model="userForm.website"
          />
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
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

.form-group {
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.form-group label {
  display: block;
  margin-bottom: calc(var(--spacing-unit) * 1);
  font-weight: 500;
  color: var(--text-medium);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.form-group input.error,
.form-group select.error {
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

/* Toggle switch styles */
.toggle-container {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 2);
}

.toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(24px);
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

html.dark .slider {
  background-color: #4b5563;
}

html.dark .error-message {
  background-color: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}
</style>
