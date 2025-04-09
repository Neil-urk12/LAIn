<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    loading.value = false;
  }, 1500);

  // Store a deep copy of the initial form data when component mounts
  initialData.value = JSON.parse(JSON.stringify(formData));
});

interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  jobTitle: string;
  company: string;
  website: string;
  linkedin: string;
}

// Initial data (replace with actual data fetching if needed)
const initialData = ref<UserSettings | null>(null);

const formData = reactive<UserSettings>({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  bio: 'AI enthusiast and lifelong learner. Currently exploring deep learning and natural language processing.',
  jobTitle: 'Software Engineer',
  company: 'Tech Solutions Inc.',
  website: '',
  linkedin: '',
});

onMounted(() => {
  // Store a deep copy of the initial form data when component mounts
  initialData.value = JSON.parse(JSON.stringify(formData));
});


const saveChanges = () => {
  console.log('Saving changes:', formData);
  // Simulate saving by updating the initial data state
  // In a real app, you would send this data to your backend API
  if (initialData.value) {
    initialData.value = JSON.parse(JSON.stringify(formData));
  }
  alert('Changes saved!'); // Placeholder feedback
};
</script>


<template>
  <div class="settings-page container">
    <!-- Skeleton Loading State -->
    <div v-if="loading" class="skeleton-loading">
      <div class="skeleton-header">
        <div class="skeleton-title"></div>
        <div class="skeleton-subtitle"></div>
      </div>

      <div class="skeleton-nav">
        <div class="skeleton-nav-item" v-for="i in 6" :key="i"></div>
      </div>

      <div class="skeleton-grid">
        <div class="skeleton-section" v-for="i in 2" :key="i">
          <div class="skeleton-section-header">
            <div class="skeleton-section-title"></div>
            <div class="skeleton-section-subtitle"></div>
          </div>

          <div class="skeleton-avatar"></div>

          <div class="skeleton-form">
            <div class="skeleton-form-row" v-for="j in 3" :key="j">
              <div class="skeleton-input"></div>
              <div class="skeleton-input"></div>
            </div>
            <div class="skeleton-input"></div>
            <div class="skeleton-textarea"></div>
          </div>
        </div>
      </div>

      <div class="skeleton-actions">
        <div class="skeleton-button"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>

    <!-- Main Content -->

    <main class="settings-main">
      <h1>Settings</h1>
      <p>Manage your account settings and preferences</p>

      <nav class="settings-mini-nav">
        <a href="#" class="mini-nav-link active">Profile</a>
        <a href="#" class="mini-nav-link">Account</a>
        <a href="#" class="mini-nav-link">Appearance</a>
        <a href="#" class="mini-nav-link">Notifications</a>
        <a href="#" class="mini-nav-link">Privacy &amp; Security</a>
        <a href="#" class="mini-nav-link">Billing</a>
      </nav>

      <div class="settings-grid">
        <!-- Profile Information -->
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

        <!-- Professional Information -->
        <section class="settings-section">
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
          </div>
        </section>
      </div>
      <div class="form-actions">
        <button @click="saveChanges" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="icon-margin">
            <path d="M8 1a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V5.5a.5.5 0 0 1-1 0V4H6a.5.5 0 0 1 0-1h1.5V1.5A.5.5 0 0 1 8 1zM.5 3h15a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5zM1 3.5v8h14v-8H1z"/>
          </svg>
          Save Changes
        </button>
        <button class="btn btn-secondary logout-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" class="icon-margin">
            <path d="M16 13v-2H7v2h9zm-4-9C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          Log Out
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Skeleton Loading Styles */
.skeleton-loading {
  padding: 2rem;
}

.skeleton-header {
  margin-bottom: 3rem;
}

.skeleton-title {
  height: 2.25rem;
  width: 8rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.skeleton-subtitle {
  height: 1.125rem;
  width: 16rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
}

.skeleton-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.skeleton-nav-item {
  height: 1.5rem;
  width: 5rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.skeleton-section {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
}

.skeleton-section-header {
  margin-bottom: 2rem;
}

.skeleton-section-title {
  height: 1.5rem;
  width: 10rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
}

.skeleton-section-subtitle {
  height: 0.9375rem;
  width: 14rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
}

.skeleton-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--bg-light);
  margin: 0 auto 1rem;
}

.skeleton-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skeleton-form-row {
  display: flex;
  gap: 1.5rem;
}

.skeleton-input {
  flex: 1;
  height: 2.5rem;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
  min-width: 240px;
}

.skeleton-textarea {
  height: 100px;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
}

.skeleton-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.skeleton-button {
  height: 3rem;
  width: 8rem;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
}

@media (max-width: 640px) {
  .skeleton-actions {
    flex-direction: column;
  }

  .skeleton-button {
    width: 100%;
  }

  .skeleton-form-row {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Original Styles */
.settings-page {
  background-color: var(--bg-light);
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1rem;
  }
}

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


.settings-main {
  flex: 1;
  padding: 2rem;
}

.icon-margin {
  margin-right: 0.75rem;
}

.settings-main h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
  letter-spacing: -0.025em;
}

@media (max-width: 768px) {
  .settings-main h1 {
    font-size: 1.75rem;
  }
}

.settings-main > p {
  font-size: 1.125rem;
  color: var(--text-light);
  margin-bottom: 3rem;
}
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
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

.profile-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.settings-page label {
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .form-actions button {
    width: 100%;
  }
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

.input-field::placeholder {
  color: var(--text-light);
  opacity: 0.7;
}

textarea.input-field {
  resize: vertical;
  min-height: 100px;
}

.website-field {
  margin-top: 1.5rem;
}
@media (max-width: 768px) {
  .settings-main {
    padding: 1rem;
  }

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
