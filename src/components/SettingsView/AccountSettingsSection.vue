<script setup lang="ts">
import { ref, reactive } from 'vue';

// Change Password fields
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

function updatePassword() {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    alert('Please fill in all password fields.');
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    alert('New passwords do not match.');
    return;
  }
  alert('Password updated successfully (dummy).');
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
}

// Two-Factor Authentication toggle
const twoFactorEnabled = ref(false);

function toggleTwoFactor() {
  twoFactorEnabled.value = !twoFactorEnabled.value;
  alert('Two-Factor Authentication ' + (twoFactorEnabled.value ? 'enabled' : 'disabled') + ' (dummy).');
}

function setup2FA() {
  alert('Set up 2FA flow started (dummy).');
}

// Dummy active sessions
const sessions = ref([
  { id: 1, device: 'Chrome on Windows', current: true, lastActive: 'Now' },
  { id: 2, device: 'Safari on iPhone', current: false, lastActive: '2 hours ago' },
  { id: 3, device: 'Firefox on MacBook', current: false, lastActive: 'Yesterday' },
]);

function logoutSession(sessionId: number) {
  if (sessions.value.find(s => s.id === sessionId)?.current) {
    alert('Cannot log out of current session.');
    return;
  }
  sessions.value = sessions.value.filter(s => s.id !== sessionId);
  alert('Logged out of session (dummy).');
}

// Dummy connected accounts
const connectedAccounts = reactive([
  { id: 'github', name: 'GitHub', connected: true },
  { id: 'facebook', name: 'Facebook', connected: false },
  { id: 'linkedin', name: 'LinkedIn', connected: false },
]);

function toggleAccountConnection(accountId: string) {
  const account = connectedAccounts.find(acc => acc.id === accountId);
  if (!account) return;
  account.connected = !account.connected;
  alert(account.connected ? 'Connected to ' + account.name + ' (dummy).' : 'Disconnected from ' + account.name + ' (dummy).');
}

function deleteAccount() {
  const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
  if (confirmed) {
    alert('Account deleted (dummy).');
  }
}
</script>

<template>
  <div class="account-settings-container">
    <!-- Change Password Section -->
    <section class="settings-section">
      <div class="section-header">
        <h2>Change Password</h2>
      </div>
      <div class="form-field">
        <label for="currentPassword">Current password</label>
        <input id="currentPassword" type="password" class="input-field" v-model="currentPassword" />
      </div>
      <div class="form-field">
        <label for="newPassword">New password</label>
        <input id="newPassword" type="password" class="input-field" v-model="newPassword" />
      </div>
      <div class="form-field">
        <label for="confirmPassword">Confirm new password</label>
        <input id="confirmPassword" type="password" class="input-field" v-model="confirmPassword" />
      </div>
      <button class="btn btn-secondary update-password-btn" @click="updatePassword">Update Password</button>
    </section>

    <!-- Two-Factor Authentication Section -->
    <section class="settings-section">
      <div class="section-header">
        <h2>Two-Factor Authentication</h2>
        <p>Add an extra layer of security to your account</p>
      </div>
      <div class="two-factor-row">
        <span>Enable two-factor authentication</span>
        <label class="switch">
          <input type="checkbox" v-model="twoFactorEnabled" @change="toggleTwoFactor" />
          <span class="slider round"></span>
        </label>
      </div>
      <button class="btn btn-secondary" @click="setup2FA">Set Up 2FA</button>
    </section>

    <!-- Active Sessions Section -->
    <section class="settings-section">
      <div class="section-header">
        <h2>Active Sessions</h2>
      </div>
      <ul class="sessions-list">
        <li v-for="session in sessions" :key="session.id" class="session-item" :class="{ current: session.current }">
          <div class="session-icon">
            <svg v-if="session.device.includes('iPhone')" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <div class="session-details">
            <strong>{{ session.device }}</strong>
            <span v-if="session.current" class="badge current-badge">Current</span>
            <small>Last active: {{ session.lastActive }}</small>
          </div>
          <button
            class="btn btn-secondary"
            :class="{ 'current-device-btn': session.current }"
            :disabled="session.current"
            @click="logoutSession(session.id)"
          >
            {{ session.current ? 'Current Device' : 'Log Out' }}
          </button>
        </li>
      </ul>
    </section>

    <!-- Connected Accounts Section -->
    <section class="settings-section">
      <div class="section-header">
        <h2>Connected Accounts</h2>
      </div>
      <ul class="connected-accounts-list">
        <li v-for="account in connectedAccounts" :key="account.id" class="account-item">
          <div class="account-icon">
            <svg v-if="account.id === 'github'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            <svg v-else-if="account.id === 'facebook'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 4.98 3.66 9.13 8.44 9.9v-7H7.9v-2.9h2.54V9.84c0-2.5 1.5-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9C22 6.53 17.5 2.04 12 2.04z"/></svg>
            <svg v-else-if="account.id === 'linkedin'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </div>
          <div class="account-details">
            <strong>{{ account.name }}</strong>
            <small>{{ account.connected ? 'Connected' : 'Not connected' }}</small>
          </div>
          <button class="btn btn-secondary" @click="toggleAccountConnection(account.id)">
            {{ account.connected ? 'Disconnect' : 'Connect' }}
          </button>
        </li>
      </ul>
    </section>

    <!-- Danger Zone Section -->
    <section class="settings-section danger-zone">
      <div class="section-header">
        <h2 class="danger-title">Danger Zone</h2>
      </div>
      <div class="danger-content">
        <div>
          <strong>Delete account</strong>
          <p>Permanently delete your account and all associated data</p>
        </div>
        <button class="btn btn-danger" @click="deleteAccount">Delete Account</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.account-settings-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.section-header p {
  font-size: 0.875rem;
  color: var(--text-light);
  line-height: 1.5;
}

.form-field {
  margin-bottom: 1.5rem;
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

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}
html.dark .btn-danger {
  background-color: #bd2130;
}

.btn-danger:hover {
  background-color: #c82333;
}
html.dark .btn-danger:hover {
  background-color: #a71d2a;
}


.update-password-btn {
  margin-top: 0.5rem;
}

/* Two-Factor Auth */
.two-factor-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

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

/* Active Sessions */
.sessions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
}

.session-icon {
  color: var(--text-light);
  flex-shrink: 0;
}
.session-icon svg {
    width: 24px;
    height: 24px;
}

.session-details {
  flex-grow: 1;
  line-height: 1.3;
}
.session-details strong {
  color: var(--text-dark);
  display: block;
  margin-bottom: 0.2rem;
}
.session-details small {
  color: var(--text-light);
  font-size: 0.8rem;
}

.badge.current-badge {
  background-color: var(--primary-color);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.current-device-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Connected Accounts */
.connected-accounts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}
.account-item:last-child {
    border-bottom: none;
}

.account-icon {
  color: var(--text-dark);
  flex-shrink: 0;
}
.account-icon svg {
    width: 24px;
    height: 24px;
}

.account-details {
  flex-grow: 1;
  line-height: 1.3;
}
.account-details strong {
  color: var(--text-dark);
  display: block;
}
.account-details small {
  color: var(--text-light);
  font-size: 0.8rem;
}

/* Danger Zone */
.danger-zone {
  border-color: #dc3545;
}
html.dark .danger-zone {
  border-color: #bd2130;
}

.danger-title {
  color: #dc3545;
}
html.dark .danger-title {
  color: #f8d7da;
}

.danger-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.danger-content p {
    margin-bottom: 0;
    color: var(--text-light);
}
.danger-content strong {
    color: var(--text-dark);
}

@media (max-width: 768px) {
  .settings-section {
    padding: 1.5rem;
  }
  .section-header h2 {
    font-size: 1.1rem;
  }
  .session-item, .account-item, .danger-content {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  .session-item button, .account-item button, .danger-content button {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: center;
  }
  .current-device-btn {
      margin-top: 0.5rem;
  }
}
</style>
