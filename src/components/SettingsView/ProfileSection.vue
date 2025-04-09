<template>
  <section class="settings-section">
    <div class="section-header">
      <h2>Profile Information</h2>
      <p>Update your personal information and public profile</p>
    </div>

    <!-- Avatar -->
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
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
}

const props = defineProps<{
  initialData: ProfileData
}>();

const formData = reactive<ProfileData>({
  firstName: props.initialData.firstName,
  lastName: props.initialData.lastName,
  email: props.initialData.email,
  username: props.initialData.username,
  bio: props.initialData.bio
});
</script>

<style scoped>
.settings-section {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  letter-spacing: -0.025em;
}

.section-header p {
  font-size: 0.9375rem;
  color: var(--text-light);
  line-height: 1.5;
}

.profile-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.avatar-image {
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

.avatar-image svg {
  width: 48px;
  height: 48px;
  color: var(--text-light);
}

.change-avatar-link {
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 500;
}

.change-avatar-link:hover {
  text-decoration: underline;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.form-field {
  flex: 1;
  min-width: 240px;
}

label {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.input-field {
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

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

textarea.input-field {
  resize: vertical;
  min-height: 100px;
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
</style>
