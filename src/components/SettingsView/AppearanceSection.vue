<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'AppearanceSection' });

const selectedTheme = ref('light'); // 'light', 'dark', 'system'
const selectedLanguage = ref('en');
const reduceMotion = ref(false);
const highContrast = ref(false);

</script>

<template>
  <section class="settings-section appearance-section">
    <div class="section-header">
      <h2>Appearance</h2>
      <p>Customize how LAIn looks and feels</p>
    </div>

    <!-- Theme Section -->
    <div class="setting-group">
      <h3>Theme</h3>
      <div class="theme-options">
        <button
          :class="['theme-option', { active: selectedTheme === 'light' }]"
          @click="selectedTheme = 'light'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <span>Light</span>
        </button>
        <button
          :class="['theme-option', { active: selectedTheme === 'dark' }]"
          @click="selectedTheme = 'dark'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <span>Dark</span>
        </button>
        <button
          :class="['theme-option', { active: selectedTheme === 'system' }]"
          @click="selectedTheme = 'system'"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          <span>System</span>
        </button>
      </div>
    </div>

    <!-- Language Section -->
    <div class="setting-group">
      <h3>Language</h3>
      <div class="form-field">
        <label for="displayLanguage">Display language</label>
        <select id="displayLanguage" v-model="selectedLanguage" class="input-field">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          {/* Add more languages as needed */}
        </select>
      </div>
    </div>

    <!-- Accessibility Section -->
    <div class="setting-group">
      <h3>Accessibility</h3>
      <div class="accessibility-option">
        <div>
          <strong>Reduce motion</strong>
          <p>Minimize animations and transitions</p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="reduceMotion">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="accessibility-option">
        <div>
          <strong>High contrast</strong>
          <p>Increase contrast for better readability</p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="highContrast">
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <!-- Save Button -->
    <div class="save-button-container">
       <button class="btn btn-primary">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="icon-margin">
           <path d="M8 1a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V5.5a.5.5 0 0 1-1 0V4H6a.5.5 0 0 1 0-1h1.5V1.5A.5.5 0 0 1 8 1zM.5 3h15a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5zM1 3.5v8h14v-8H1z"/>
         </svg>
         Save Preferences
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

/* Theme Options */
.theme-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  cursor: pointer;
  background-color: var(--bg-white);
  color: var(--text-dark);
  transition: all 0.2s ease;
  font-weight: 500;
}

.theme-option svg {
  color: var(--text-light);
  transition: color 0.2s ease;
}

.theme-option:hover {
  border-color: var(--primary-color);
  background-color: var(--bg-light);
}
html.dark .theme-option:hover {
    background-color: var(--section-background);
}


.theme-option.active {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 0 0 2px var(--primary-color);
}

.theme-option.active svg {
  color: white;
}

/* Language Dropdown */
.form-field {
  max-width: 400px;
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
  cursor: pointer;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Accessibility Options */
.accessibility-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.accessibility-option:last-child {
    margin-bottom: 0;
}

.accessibility-option strong {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.accessibility-option p {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
}

/* The switch - copied from AccountSettingsSection */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 1rem;
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

/* Save Button */
.save-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
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
  cursor: pointer;
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

@media (max-width: 768px) {
  .settings-section {
    padding: 1.5rem;
  }
  .section-header h2 {
    font-size: 1.25rem;
  }
  .theme-options {
    grid-template-columns: 1fr;
  }
  .accessibility-option {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .switch {
      margin-left: 0;
  }
  .save-button-container {
      justify-content: center;
  }
  .btn {
      width: 100%;
      justify-content: center;
  }
}
</style>
