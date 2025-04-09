<script setup lang="ts">
import { reactive, ref } from 'vue';

defineOptions({ name: 'NotificationPreferencesSection' });

const emailNotifications = reactive({
  courseUpdates: true,
  newCourses: true,
  promotions: false,
  newsletter: true,
});

const platformNotifications = reactive({
  discussionReplies: true,
  assignmentFeedback: true,
  courseCompletion: true,
  learningReminders: true,
});

const emailFrequency = ref('daily');

// Add logic to save preferences later
</script>

<template>
  <section class="settings-section notification-preferences-section">
    <div class="section-header">
      <h2>Notification Preferences</h2>
      <p>Control how and when you receive notifications</p>
    </div>

    <!-- Email Notifications -->
    <div class="setting-group">
      <h3>Email Notifications</h3>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Course updates</strong>
          <p>Receive notifications about course content updates</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="emailNotifications.courseUpdates">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>New courses</strong>
          <p>Be notified when new courses are available</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="emailNotifications.newCourses">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Promotions and offers</strong>
          <p>Receive special offers and promotional emails</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="emailNotifications.promotions">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Weekly newsletter</strong>
          <p>Get weekly updates on AI trends and learning resources</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="emailNotifications.newsletter">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Platform Notifications -->
    <div class="setting-group">
       <div class="platform-header">
         <h3>Platform Notifications</h3>
       </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Discussion replies</strong>
          <p>When someone replies to your discussion post</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="platformNotifications.discussionReplies">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Assignment feedback</strong>
          <p>When an instructor provides feedback on your assignment</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="platformNotifications.assignmentFeedback">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Course completion</strong>
          <p>When you complete a course or earn a certificate</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="platformNotifications.courseCompletion">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-text">
          <strong>Learning reminders</strong>
          <p>Reminders to continue your learning journey</p>
        </div>
        <div class="setting-control">
          <label class="switch">
            <input type="checkbox" v-model="platformNotifications.learningReminders">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Notification Delivery -->
    <div class="setting-group">
      <h3>Notification Delivery</h3>
       <div class="form-field">
         <label for="emailFrequency">Email frequency</label>
         <select id="emailFrequency" v-model="emailFrequency" class="input-field frequency-select">
           <option value="daily">Daily digest</option>
           <option value="weekly">Weekly digest</option>
           <option value="instant">As it happens</option>
           <option value="off">Off</option>
         </select>
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
/* Reusing styles from other settings sections */
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

.platform-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}
.platform-header h3 {
    margin-bottom: 0;
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

/* Frequency Dropdown */
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

.frequency-select {
    padding: 0.6rem 1rem;
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
  .save-button-container {
      justify-content: center;
  }
  .btn {
      width: 100%;
      justify-content: center;
  }
}
</style>
