<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'PrivacySecuritySection' });

const profileVisibility = ref('public');
const showLearningActivity = ref(true);
const showCertificates = ref(true);
const allowDataCollection = ref(true);
const allowPersonalizedRecs = ref(true);
const allowThirdPartyCookies = ref(false);

// Add logic to save settings later
</script>


<template>
  <section class="settings-section privacy-security-section">
    <div class="section-header">
      <h2>Privacy & Security</h2>
      <p>Manage your privacy settings and security preferences</p>
    </div>

    <!-- Privacy Settings -->
    <div class="setting-group">
      <h3>Privacy Settings</h3>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Profile visibility</strong>
          <p>Control who can see your profile information</p>
        </div>
        <div class="setting-control">
          <select v-model="profileVisibility" class="input-field visibility-select">
            <option value="public">Public</option>
            <option value="connections">Connections Only</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Learning activity</strong>
          <p>Show your learning progress to other students</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="showLearningActivity">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Show certificates</strong>
          <p>Display your earned certificates on your profile</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="showCertificates">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Data & Cookies -->
    <div class="setting-group">
      <h3>Data & Cookies</h3>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Learning data collection</strong>
          <p>Allow us to collect data to improve your learning experience</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="allowDataCollection">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Personalized recommendations</strong>
          <p>Receive course recommendations based on your interests</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="allowPersonalizedRecs">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Third-party cookies</strong>
          <p>Allow third-party cookies for enhanced functionality</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="allowThirdPartyCookies">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
       <div class="setting-item download-data">
         <button class="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="icon-margin"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>
            Download My Data
         </button>
       </div>
    </div>

    <!-- Account Security -->
    <div class="setting-group">
      <h3>Account Security</h3>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Login history</strong>
          <p>View and manage your recent login sessions</p>
        </div>
        <div class="setting-control">
          <button class="btn btn-secondary">View History</button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Active sessions</strong>
          <p>Manage devices currently logged into your account</p>
        </div>
        <div class="setting-control">
          <button class="btn btn-secondary">Manage</button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="save-button-container">
       <button class="btn btn-primary">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="icon-margin">
           <path d="M8 1a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V5.5a.5.5 0 0 1-1 0V4H6a.5.5 0 0 1 0-1h1.5V1.5A.5.5 0 0 1 8 1zM.5 3h15a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5zM1 3.5v8h14v-8H1z"/>
         </svg>
         Save Settings
       </button>
    </div>

  </section>
</template>

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
}

.section-header p {
  font-size: 0.9375rem;
  color: var(--text-light);
  line-height: 1.5;
}

.setting-group {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}
.setting-group:last-of-type {
    border-bottom: none;
    margin-bottom: 1.5rem;
}

.setting-group h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.setting-item:last-child {
    margin-bottom: 0;
}

.setting-text {
  flex-grow: 1;
  margin-right: 1rem;
}

.setting-text strong {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.setting-text p {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
  line-height: 1.4;
}

.setting-control {
  flex-shrink: 0;
}

/* Visibility Dropdown */
.visibility-select {
    min-width: 150px;
}

.input-field {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-family: var(--font-family-sans);
  font-size: 0.875rem;
  color: var(--text-dark);
  background-color: var(--bg-white);
  transition: border-color 0.2s ease;
  cursor: pointer;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Switch Toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
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
  background-color: #ccc;
  transition: .4s;
}
html.dark .slider {
  background-color: #555;
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
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Buttons */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--bg-light);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--primary-color-dark);
}

.icon-margin {
  margin-right: 0.5rem;
}

.download-data {
    justify-content: flex-start;
    margin-top: 1rem;
}

/* Save Button Container */
.save-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .settings-section {
    padding: 1.5rem;
  }
  .section-header h2 {
    font-size: 1.25rem;
  }
  .visibility-select {
      min-width: 0;
      width: auto;
  }
  .save-button-container {
      justify-content: center;
  }
  .btn {
      width: 100%;
      justify-content: center;
  }
  .download-data .btn {
      width: auto;
  }
  .setting-item .btn-secondary {
       width: auto;
  }
}
</style>
