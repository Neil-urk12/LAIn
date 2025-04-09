<script setup lang="ts">
import { reactive, defineProps, defineEmits } from 'vue';

// Combined Interface from Profile and Professional
interface ProfileSettingsData {
  // Profile
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  // Professional
  jobTitle: string;
  company: string;
  website: string;
  linkedin: string;
}

// Props expecting the combined data structure
const props = defineProps<{
  initialData: ProfileSettingsData
}>();

// Emits from SettingsActions
const emit = defineEmits<{
  (e: 'save'): void
  (e: 'logout'): void
}>();

// Reactive form data using the combined structure from props
const formData = reactive<ProfileSettingsData>({ ...props.initialData });

// Methods from SettingsActions
const onSave = () => emit('save');
const onLogout = () => emit('logout');

defineOptions({ name: 'ProfileSettingsGroup' });

</script>

<template>
  <div class="profile-settings-group-wrapper">
    <div class="settings-grid">
      <!-- Profile Section Content -->
      <section class="settings-section profile-section">
        <div class="section-header">
          <h2>Profile Information</h2>
          <p>Update your personal information and public profile</p>
        </div>
        <div class="avatar-container">
          <div class="avatar-image">
            <svg xmlns="http://www.w3.org/2000/svg" class="placeholder-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <a href="#" class="change-avatar-link">Change avatar</a>
        </div>
        <div class="profile-form-container">
          <div class="form-row">
            <div class="form-field">
              <label for="firstName">First name</label>
              <input id="firstName" type="text" v-model="formData.firstName" class="input-field" />
            </div>
            <div class="form-field">
              <label for="lastName">Last name</label>
              <input id="lastName" type="text" v-model="formData.lastName" class="input-field" />
            </div>
          </div>
          <div class="form-field">
            <label for="email">Email address</label>
            <input id="email" type="email" v-model="formData.email" class="input-field" />
          </div>
          <div class="form-field">
            <label for="username">Username</label>
            <input id="username" type="text" v-model="formData.username" class="input-field" />
          </div>
          <div class="form-field">
            <label for="bio">Bio</label>
            <textarea id="bio" rows="3" v-model="formData.bio" class="input-field"></textarea>
          </div>
        </div>
      </section>

      <!-- Professional Section Content -->
      <section class="settings-section professional-section">
        <div class="section-header">
          <h2>Professional Information</h2>
          <p>Add your work and social profiles</p>
        </div>
        <div class="profile-fields">
          <div class="form-row">
            <div class="form-field">
              <label for="jobTitle">Job title</label>
              <input id="jobTitle" type="text" v-model="formData.jobTitle" class="input-field" />
            </div>
            <div class="form-field">
              <label for="company">Company/Organization</label>
              <input id="company" type="text" v-model="formData.company" class="input-field" />
            </div>
          </div>
          <div class="form-field">
            <label for="website">Website</label>
            <input id="website" type="url" v-model="formData.website" placeholder="https://example.com" class="input-field" />
          </div>
          <div class="form-field">
            <label for="linkedin">LinkedIn</label>
            <input id="linkedin" type="url" v-model="formData.linkedin" placeholder="https://linkedin.com/in/username" class="input-field" />
          </div>

          <div class="form-actions professional-actions">
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
        </div>
      </section>
    </div>

  </div>
</template>



<style scoped>
/* Wrapper for the entire group */
.profile-settings-group-wrapper {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* General Grid Layout */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

.profile-section .section-header {
  margin-bottom: 2rem;
}

.profile-section .section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  letter-spacing: -0.025em;
}

.profile-section .section-header p {
  font-size: 0.9375rem;
  color: var(--text-light);
  line-height: 1.5;
}

.profile-section .profile-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-section .avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.profile-section .avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-light);
}

.profile-section .avatar-image svg {
  width: 48px;
  height: 48px;
  color: var(--text-light);
}

.profile-section .change-avatar-link {
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 500;
}

.profile-section .change-avatar-link:hover {
  text-decoration: underline;
}

.profile-section .form-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.profile-section .form-field {
  flex: 1;
  min-width: 240px;
}

.profile-section label {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.profile-section .input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-family: var(--font-family-sans);
  font-size: 0.875rem;
  color: var(--text-dark);
  background-color: var(--bg-white);
  transition: border-color 0.2s ease;
}

.profile-section .input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.profile-section textarea.input-field {
  resize: vertical;
  min-height: 100px;
}

.professional-section .section-header {
  margin-bottom: 2rem;
}

.professional-section .section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  letter-spacing: -0.025em;
}

.professional-section .section-header p {
  font-size: 0.9375rem;
  color: var(--text-light);
  line-height: 1.5;
}

.professional-section .profile-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.professional-section .form-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.professional-section .form-field {
  flex: 1;
  min-width: 240px;
}

.professional-section label {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.professional-section .input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-family: var(--font-family-sans);
  font-size: 0.875rem;
  color: var(--text-dark);
  background-color: var(--bg-white);
  transition: border-color 0.2s ease;
}

.professional-section .input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.professional-section .input-field::placeholder {
  color: var(--text-light);
  opacity: 0.7;
}

/* Styles for Actions (now inside Professional Section) */
.professional-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.form-actions .btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.5;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.form-actions .btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.form-actions .btn-primary:hover {
  background-color: var(--primary-color-dark);
}

.form-actions .btn-secondary {
  background-color: transparent;
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.form-actions .btn-secondary:hover {
  background-color: var(--bg-light);
}

.form-actions .icon-margin {
  margin-right: 0.75rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .settings-section {
    padding: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.25rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .form-field {
    min-width: 100%;
  }

  .avatar-image {
    width: 100px;
    height: 100px;
  }

  .avatar-image svg {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .form-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
